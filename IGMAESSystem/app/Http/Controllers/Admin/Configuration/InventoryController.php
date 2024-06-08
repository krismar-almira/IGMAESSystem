<?php

namespace App\Http\Controllers\Admin\Configuration;

use stdClass;
use App\Models\Inventory;
use App\Models\GroupWorker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
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
      $groupWorker->save();
    }
    return response($inventory);
  }
  function Table(Request $request){
    $datas;
    $recordsFiltered;
    //return $request['search']['regex'];
    //image, name, type, quantity, price
    if($request['search']['value']!=null){
      // $datas = DB::table('')
      // ->select('products.id','products.location','products.name', 'products.type', DB::raw('0 as quantity'), 'products.price')
      // ->where(function($query) use($request) {
      //     $query->where('products.name', 'like','%'.$request['search']['value'].'%')
      //     ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      // })
      // // ->where('products.name', 'like','%'.$request['search']['value'].'%')
      // // ->orWhere('products.type', 'like','%'.$request['search']['value'].'%')
      // ->where('products.isActive', '<>', 'false')
      // ->offset($request['start'])->limit($request['length'])
      // ->get();
      // $recordsFiltered =DB::table('products')
      // ->select('products.name', 'products.type', DB::raw('0 as quantity'), 'products.price')
      // ->where(function($query) use($request) {
      //     $query->where('products.name', 'like','%'.$request['search']['value'].'%')
      //     ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      // })
      // ->where('products.isActive', '<>', 'false')
      // ->count();
    }
    else{
      $datas = DB::table('inventories')
      ->select('inventories.id as id','products.name as productname', 'inventories.quantity as quantity', 'inventories.quantity_sold as sold','inventories.expiration as expire','products.unit_measure',DB::raw("COUNT(*) as 'workers'"))
      ->leftjoin('products','inventories.product_id','=','products.id')
      ->leftjoin('group_workers', 'group_workers.inventory_id','=', 'inventories.id')
      ->groupby('id')
      ->where('products.isActive', '<>', 'false')
      ->offset($request['start'])->limit($request['length'])
      ->get();
      $recordsFiltered = DB::table('products')
      ->where('products.isActive', '<>', 'false')
      ->count();
    }

    $recordsTotal = DB::table('inventories')
    //->where('products.isActive', '<>', 'false')
    ->count();
    $arrays =[];
    //return response()->json($datas);

    foreach ($datas as $data) {
      $array=[
        $data->productname,
        $data->quantity,
        $data->sold.$data->unit_measure,
        $data->workers.$data->unit_measure,
        $data->expire
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
}