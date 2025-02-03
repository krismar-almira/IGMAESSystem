<?php

namespace App\Http\Controllers\Admin\Configuration;

use stdClass;
use App\Models\Inventory;
use App\Models\GroupWorker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\PurchaseDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
  function Save(Request $request){
    $tempData = $request->getContent();
    $requestData = json_decode($tempData, true);
    $rules = [
      'qty' => 'required|numeric',
      'employeeShare'=>'required|numeric',
      'companyShare'=>'required|numeric',
      'expense'=>'required|numeric',
      'expirationDate'=>'required|date',
      'selectedEmployee'=>'required|array|min:1',
      'selectedProduct'=>'required|array|min:1'
    ];
    $validator = Validator::make($requestData, $rules);
    if($validator->fails()){
      return response()->json([
        'errors' => $validator->errors()->all()
      ], 422);
    }
    $inventory = new Inventory();
    $inventory->product_id=$requestData['selectedProduct'][0]['id'];
    $inventory->quantity = $requestData['qty'];
    $inventory->user_share = $requestData['employeeShare'];
    $inventory->employer_share = $requestData['companyShare'];
    $inventory->expense = $requestData['expense'];
    $inventory->quantity_sold = 0;
    $inventory->expiration=$requestData['expirationDate'];
    $inventory->save();

    foreach ($requestData['selectedEmployee'] as $employee) {
      $groupWorker = new GroupWorker();
      $groupWorker->user_id = $employee['id'];
      $groupWorker->inventory_id = $inventory->id;
      $groupWorker->employee_share = $requestData['employeeShare']/count($requestData['selectedEmployee']);
      $groupWorker->save();
    }
    return response($inventory);
  }
  function Update(Request $request){
    $tempData = $request->getContent();
    $requestData = json_decode($tempData, true);
    $rules = [
      'qty' => 'required|numeric',
      'employeeShare'=>'required|numeric',
      'companyShare'=>'required|numeric',
      'expense'=>'required|numeric',
      'expirationDate'=>'required|date',
      'selectedEmployee'=>'required|array|min:1',
      'selectedProduct'=>'required|array|min:1'
    ];
    $validator = Validator::make($requestData, $rules);
    if($validator->fails()){
      return response()->json([
        'errors' => $validator->errors()->all()
      ], 422);
    }
    $inventory = Inventory::find($requestData['id']);
    $inventory->product_id=$requestData['selectedProduct'][0]['id'];
    $inventory->quantity = $requestData['qty'];
    $inventory->user_share = $requestData['employeeShare'];
    $inventory->employer_share = $requestData['companyShare'];
    $inventory->expense = $requestData['expense'];
    $inventory->quantity_sold = 0;
    $inventory->expiration=$requestData['expirationDate'];
    $inventory->save();

    $deleted = DB::table('group_workers')->where('inventory_id', '=', $inventory->id)->delete();
    foreach ($requestData['selectedEmployee'] as $employee) {
      $groupWorker = new GroupWorker();
      $groupWorker->user_id = $employee['id'];
      $groupWorker->inventory_id = $inventory->id;
      $groupWorker->employee_share = $requestData['employeeShare']/count($requestData['selectedEmployee']);
      $groupWorker->save();
    }
    return response($inventory);
  }
  function Table(Request $request){
    $datas = '';
    $recordsFiltered='';
      $datas = DB::table('inventories')
      ->select('inventories.id as id',
                'inventories.date_entry',
                'inventories.disposed',
                'products.name as productname', 
                'inventories.quantity as quantity', 
                'inventories.quantity_sold as sold',
                'inventories.expiration as expire',
                'products.unit_measure',
                DB::raw("COUNT(inventories.id) as 'workers'"),
                )
      ->leftjoin('products','inventories.product_id','=','products.id')
      ->join('group_workers', 'group_workers.inventory_id','=', 'inventories.id')
      ->groupby('inventories.id')
      ->orderBy('inventories.date_entry','DESC')
      ->offset($request['start'])->limit($request['length'])
      ->where('products.name', 'like', '%'.$request['search']['value'].'%')
      ->get();
      foreach ($datas as &$key) {
          $sold = PurchaseDetail::where('inventory_id', $key->id)->sum('count');
          $key->sold=$sold;
          if(Carbon::parse($key->expire)->lessThanOrEqualTo(Carbon::now())){
            $key->qty_expired =  $key->quantity - $sold;
          }else{
            $key->qty_expired = 0;
          }
          $key->available= $key->quantity  - $key->sold - $key->disposed - $key->qty_expired;
        $recordsFiltered = DB::table('inventories')
                          ->leftJoin('products', 'inventories.product_id', '=', 'products.id')
                          ->join('group_workers', 'group_workers.inventory_id', '=', 'inventories.id')
                          ->distinct('inventories.id')
                          ->count('inventories.id');
      }
    //return dd($datas);

    $recordsTotal = DB::table('inventories')
                        ->leftJoin('products', 'inventories.product_id', '=', 'products.id')
                        ->join('group_workers', 'group_workers.inventory_id', '=', 'inventories.id')
                        ->distinct('inventories.id')
                        ->count('inventories.id');
    $arrays =[];
    //return response()->json($datas);

    foreach ($datas as $data) {
      $array=[
        $data->id,
        $data->productname,
        $data->quantity.' ('.$data->unit_measure.')',
        $data->sold.' ('.$data->unit_measure.')',
        $data->workers,
        $data->date_entry,
        $data->expire,
        $data->qty_expired,
        $data->disposed,
        $data->available


      ];
      array_push($arrays,$array);
    }
    $val = new stdClass();
    $val->draw = $request['draw']+1;
    $val->recordsTotal = $recordsTotal;
    $val->recordsFiltered = $recordsFiltered;
    $val->data= $arrays;
    return response()->json($val);
  }
  function Get(Request $request){
    $inventory = Inventory::with(['GroupWorker.user', 'Product'])->find($request->id);
    return response()->json($inventory);
  }

}