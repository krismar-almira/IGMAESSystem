<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
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
                  ->select(DB::raw('SUM(inventories.quantity_sold) as total_sold'), 'products.name', 'products.location')
                  ->join('products', 'products.id', '=', 'inventories.product_id')
                  ->groupBy('products.name', 'products.location')
                  ->orderByRaw('total_sold desc')
                  ->get();
    return response()->json($inventories, 200);
  }

//   SELECT SUM(inventories.quantity_sold) as total_sold, products.name FROM inventories
// LEFT JOIN products on products.id = inventories.product_id
// GROUP BY products.name
// ORDER BY total_sold desc
}
