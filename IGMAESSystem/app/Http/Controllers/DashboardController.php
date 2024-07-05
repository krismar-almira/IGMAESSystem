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
}
