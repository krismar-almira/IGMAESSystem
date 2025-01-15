<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\Configuration\ProductController;
use Carbon\Carbon;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Models\PurchaseDetail;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
  function index(){
    return view('admin.dashboard');
  }
  function production(){
    $inventories = Inventory::select('quantity as qty','date_entry', 'products.name')
                  ->join('products', 'products.id', '=', 'inventories.product_id')
                  ->orderby('date_entry')
                  ->get();
    $datas = [];
    foreach ($inventories as $inventory) {
      array_push($datas,array(
          'name'=>$inventory->name,
          'quantity'=>$inventory->qty,
          'month'=>date("m", strtotime($inventory->date_entry)),
          'year'=>date("Y", strtotime($inventory->date_entry))
        )
      );
    }
    return response()->json($datas);
  }
  function GetTopSellingProducts(){
    $inventories = DB::table('inventories')
                  ->select(DB::raw('SUM(purchase_details.count) as total_sold'), 'products.name', 'products.location')
                  ->join('products', 'products.id', '=', 'inventories.product_id')
                  ->leftJoin('purchase_details','purchase_details.inventory_id','inventories.id')
                  ->groupBy('products.name', 'products.location')
                  ->orderByRaw('total_sold desc')
                  ->get();
    return response()->json($inventories, 200);
  }
  function getPurchaseData(){
    $data=[];
    $dates = Purchase::query()
    ->selectRaw('MIN(date_approve) as firstDate, MAX(date_approve) as lastDate')
    ->first();

    $firstDate = Carbon::parse($dates->firstDate)->startOfMonth();
    $lastDate = Carbon::parse($dates->lastDate)->startOfMonth();

    $monthYearArray = [];
    while ($firstDate->lessThanOrEqualTo($lastDate)) {
        $monthYearArray[] = [
            'M'=>$firstDate->format('M'),
            'm'=>$firstDate->month,
            'year'=>$firstDate->year,
        ];
        $firstDate->addMonth(); // Move to the next month
    }
    $products = Product::select('name', 'id')->get();
    $labels = [];
    foreach ($monthYearArray as $key) {
      array_push($labels,$key['M'].'-'.$key['year']);
    }
    $datasets = [];
    foreach ($products as $product) {
      $temp=[];
      $temp['label'] = $product['name'];
      $datas = [];
      foreach ($monthYearArray as $key) {
        $d ='';
        $d = DB::table('products')
                  ->select('products.name as label', DB::raw('SUM(purchase_details.count) as total_count'))
                  ->leftJoin('inventories', 'products.id', '=', 'inventories.product_id')
                  ->leftJoin('purchase_details', 'purchase_details.inventory_id', '=', 'inventories.id')
                  ->leftJoin('purchases', 'purchases.id', '=', 'purchase_details.purchase_id')
                  ->groupBy('products.id')
                  ->whereMonth('purchases.date_approve',$key['m'])
                  ->whereYear('purchases.date_approve',$key['year'])
                  ->where('products.id',$product['id'])
                  ->first();
        $datas[] = $d ? (int)$d->total_count : 0;
      }
      $temp['data'] = $datas;
      array_push($datasets, $temp);
    }
    return [
      'labels'=>$labels,
      'datasets'=>$datasets
    ];
    
    // return DB::table('products')
    //           ->select('products.name as label', DB::raw('SUM(purchase_details.count) as total_count'))
    //           ->leftJoin('inventories', 'products.id', '=', 'inventories.product_id')
    //           ->leftJoin('purchase_details', 'purchase_details.inventory_id', '=', 'inventories.id')
    //           ->leftJoin('purchases', 'purchases.id', '=', 'purchase_details.purchase_id')
    //           ->groupBy('products.id')
    //           ->get();
    // return $monthYearArray;
  }
  function getCompanyProfit(){
    $dates = Purchase::query()
    ->selectRaw('MIN(date_approve) as firstDate, MAX(date_approve) as lastDate')
    ->first();

    $firstDate = Carbon::parse($dates->firstDate)->startOfMonth();
    $lastDate = Carbon::parse($dates->lastDate)->startOfMonth();

    $monthYearArray = [];
    while ($firstDate->lessThanOrEqualTo($lastDate)) {
        $monthYearArray[] = [
            'M'=>$firstDate->format('M'),
            'm'=>$firstDate->month,
            'year'=>$firstDate->year,
        ];
        $firstDate->addMonth(); // Move to the next month
    }
    $products = Product::select('name', 'id')->get();
    $labels = [];
    foreach ($monthYearArray as $key) {
      array_push($labels,$key['M'].'-'.$key['year']);
    }
    $datas = [];

    foreach ($monthYearArray as $key) {
      $data = DB::table('purchase_details')
              ->leftJoin('inventories', 'inventories.id', '=', 'purchase_details.inventory_id')
              ->leftJoin('purchases', 'purchases.id', '=', 'purchase_details.purchase_id')
              ->select('inventories.employer_share', 'purchases.date_approve')
              ->whereMonth('purchases.date_approve',$key['m'])
              ->whereYear('purchases.date_approve',$key['year'])
              ->sum('inventories.employer_share');
      array_push($datas,(int)$data);
    }
    

    $datasets = [[
      'label'=>'Profit',
      'data'=>$datas
    ]];
    
    return [
      'labels'=>$labels,
      'datasets'=>$datasets
    ];
  }
  function getTopClient(){
    $datas = DB::table('users')
              ->select('users.name','location', DB::raw('SUM(purchase_details.count * purchase_details.price) as total'))
              ->leftJoin('purchases', 'purchases.user_id', 'users.id')
              ->leftJoin('purchase_details', 'purchase_details.purchase_id', 'purchases.id')
              ->groupBy('users.name','users.location')
              ->orderByDesc('total')
              ->get();
    return $datas;
  }
  function getTopProducer(){
    $datas = DB::table('users')
              ->select('users.name','location', DB::raw('SUM(inventories.quantity) as qty'))
              ->leftJoin('group_workers', 'group_workers.user_id', 'users.id')
              ->leftJoin('inventories', 'inventories.id', 'group_workers.inventory_id')
              ->groupBy('users.name','users.location')
              ->get();
    return $datas;
  }
}
