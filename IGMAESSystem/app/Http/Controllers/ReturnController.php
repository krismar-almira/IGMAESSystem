<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\PurchaseDetail;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Psy\Readline\Hoa\Console;

class ReturnController extends Controller
{
    function view(){
        return view('admin.returnItem');
    }
    function Table(){
        $data = DB::table('purchases')
                    ->select('purchases.id',
                                "purchases.date_approve",
                                'purchase_statuses.name as status',
                                'users.name as user',
                                'products.name as product',
                                'purchases.created_at as ordered_date',
                                DB::raw('SUM(count) as quantity'),
                                DB::raw('SUM(return_quantity) as returnqty'))
                    ->leftJoin('purchase_details','purchase_details.purchase_id','purchases.id')
                    ->leftJoin('inventories', 'purchase_details.inventory_id','inventories.id')
                    ->leftJoin('products', 'products.id','inventories.product_id')
                    ->leftJoin('users', 'purchases.user_id','users.id')
                    ->leftJoin('purchase_statuses', 'purchases.purchase_status_id','purchase_statuses.id')
                    ->groupBy('purchases.id','products.name','users.name')
                    ->orderByDesc('purchases.id');
        $data = $data->get();
        return ['data'=>$data];
    }
    function ReturnItem(Request $request){
        $total = 0;
        $purchase_id = 0;
        foreach($request->all() as $req){
            $pd = PurchaseDetail::find($req['id']);
            $purchase_id = $pd->purchase_id;
            $pd->count = $pd['count']-$req['value'];
            $pd->return_quantity = $pd->return_quantity + $req['value'];
            $pd->save();
            if($req['dispose']){
                $inventory = Inventory::find($pd->inventory_id);
                $inventory->disposed += $req['value'];
                $inventory->save();
            }
            $total+=$req['value'];
        }
        $rtr = ReturnRequest::where('purchase_id',$purchase_id)->first();
        $rtr->approve_count += $total;
        $rtr->count -= $total;
        $rtr->save();
        return true;
    }
    function ReturnRequest(Request $request){
        ReturnRequest::create([
            'purchase_id'=>$request->purchase_id,
            'approve_count'=>0,
            'count'=> $request->count
        ]);
        return true;
    }
}
