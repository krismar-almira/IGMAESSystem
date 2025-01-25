<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Models\PurchaseDetail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use PhpParser\Node\Stmt\TryCatch;

class PurchaseController extends Controller
{
    function pruchaseRequestPage(){
        return view('admin.purchase.purchaseRequest');
    }
    function pruchaseRequestStore(){
        return view('admin.purchaseRequestOnly');
    }
    function inventoryAvailByProductId($id){
        $inventories = DB::table('inventories')
                    ->select('inventories.id', 'inventories.expiration',
                                'inventories.quantity_sold','inventories.quantity','products.location',
                                'products.price', 'products.name')
                    ->leftJoin('products', 'inventories.product_id', 'products.id')
                    ->where('inventories.product_id', $id)
                    //->where('inventories.quantity_sold', '<=','inventories.quantity')
                    ->orderBy('inventories.expiration')
                    ->get();
        foreach ($inventories as &$inventory) {
            $inventory->pending = DB::table('purchase_details')
                                    ->leftJoin('purchases', 'purchases.id','purchase_details.purchase_id')
                                    ->where('purchase_details.inventory_id',$inventory->id)
                                    ->whereIn('purchases.purchase_status_id',[1,2])
                                    ->sum('purchase_details.count');
            
            $inventory->sold = (int)DB::table('purchase_details')
                                    ->leftJoin('purchases', 'purchases.id','purchase_details.purchase_id')
                                    ->where('purchase_details.inventory_id',$inventory->id)
                                    ->where('purchases.purchase_status_id',3)
                                    ->sum('purchase_details.count');
            $inventory->available = $inventory->quantity  - DB::table('purchase_details')
                                    ->leftJoin('purchases', 'purchases.id','purchase_details.purchase_id')
                                    ->where('purchase_details.inventory_id',$inventory->id)
                                    ->sum('purchase_details.count');
                                    
        }
        $filteredInventories = $inventories->filter(function ($inventory) {
            return $inventory->available > 0 || $inventory->pending > 0;
            //return true;
        })->values();
        return  response()->json($filteredInventories, 200);
    }
    function add(Request $request){
        DB::beginTransaction();
        $purchase='';
        try {
            $purchase = Purchase::create([
                'user_id'=>(Auth::user()->user_level_id==2||Auth::user()->user_level_id==1)?$request->store_id:Auth::user()->id,
                'date_purchase'=>Carbon::now(), 
                'date_approve'=>null,
                'purchase_status_id'=>1
            ]);
    
            foreach ($request->inventories as $key) {
                $inv = DB::table('inventories')->where('inventories.id', $key['id'])
                                ->select('products.price')
                                ->leftJoin('products','products.id','inventories.product_id')
                                ->first();
                PurchaseDetail::create(
                    ['purchase_id'=>$purchase['id'],
                    'inventory_id'=>$key['id'],
                    'count'=>$key['count'],
                    'price'=>$inv->price
                    ]
                );
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
        
        return $purchase;
        
    }
    function Table(){
        $data = DB::table('purchases')
                    ->select('purchases.id','purchase_statuses.name as status','users.name as user','products.name as product',DB::raw('SUM(count) as quantity'))
                    ->leftJoin('purchase_details','purchase_details.purchase_id','purchases.id')
                    ->leftJoin('inventories', 'purchase_details.inventory_id','inventories.id')
                    ->leftJoin('products', 'products.id','inventories.product_id')
                    ->leftJoin('users', 'purchases.user_id','users.id')
                    ->leftJoin('purchase_statuses', 'purchases.purchase_status_id','purchase_statuses.id')
                    ->groupBy('purchases.id','products.name','users.name');
                    
        if(Auth::user()->user_level_id==4){
            $data =$data->where('purchases.user_id',Auth::user()->id);
        }
        $data = $data->get();
        return ['data'=>$data];
    }
    function StatusChange(Request $request){
        $purchase = Purchase::find($request->id);
        $purchase->purchase_status_id = $request->status;
        if($request->status==1){
            $purchase->isApprove = false;
            $purchase->date_approve= null;
        }
        else{
            $purchase->isApprove = true;
            if(!$purchase->date_approve)$purchase->date_approve= Carbon::now();
        }
        $purchase->save();
        return $purchase;
    }
    function delete($id){
        $purchase = Purchase::find($id);
        $purchase->delete();
        return $purchase;
    }
    function PreviewData($id){
        $data = DB::table('purchases')
                ->select('purchases.id','purchase_details.inventory_id as inventory_id','purchase_statuses.name as status','users.name as user','products.name as product',DB::raw('SUM(count) as quantity'))
                ->leftJoin('purchase_details','purchase_details.purchase_id','purchases.id')
                ->leftJoin('inventories', 'purchase_details.inventory_id','inventories.id')
                ->leftJoin('products', 'products.id','inventories.product_id')
                ->leftJoin('users', 'purchases.user_id','users.id')
                ->leftJoin('purchase_statuses', 'purchases.purchase_status_id','purchase_statuses.id')
                ->groupBy('purchases.id','products.name','users.name','purchase_details.inventory_id')
                ->where('purchases.id',$id)
                ->first();
        $data->items = PurchaseDetail::where('purchase_id', $id)->get();
        return $data;
    }
}
