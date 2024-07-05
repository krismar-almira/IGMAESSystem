<?php

namespace App\Http\Controllers\Admin\Configuration;

use stdClass;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
  function All(Request $request){
    $datas;
    $recordsFiltered;
    //return $request['search']['regex'];
    //image, name, type, quantity, price
    if($request['search']['value']!=null){
      $datas = DB::table('products')
      ->select('products.id','products.location','products.name', 'products.type', DB::raw('SUM(inventories.quantity) as quantity'), 'products.price')
      ->leftJoin('inventories', 'inventories.product_id','products.id')
      ->where(function($query) use($request) {
          $query->where('products.name', 'like','%'.$request['search']['value'].'%')
          ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      })
      // ->where('products.name', 'like','%'.$request['search']['value'].'%')
      // ->orWhere('products.type', 'like','%'.$request['search']['value'].'%')
      ->where('products.isActive', '<>', 'false')
      ->offset($request['start'])->limit($request['length'])
      ->groupBy('products.id')
      ->get();
      $recordsFiltered =DB::table('products')
      ->select('products.name', 'products.type', DB::raw('0 as quantity'), 'products.price')
      ->where(function($query) use($request) {
          $query->where('products.name', 'like','%'.$request['search']['value'].'%')
          ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      })
      ->where('products.isActive', '<>', 'false')
      ->count();
    }
    else{
      $datas = DB::table('products')
      ->select('products.id','products.location','products.name', 'products.type', DB::raw('SUM(inventories.quantity) as quantity'), 'products.price')
      ->leftJoin('inventories', 'inventories.product_id','products.id')
      ->where('products.isActive', '<>', 'false')
      ->offset($request['start'])->limit($request['length'])
      ->groupBy('products.id')
      ->get();
      $recordsFiltered = DB::table('products')
      ->where('products.isActive', '<>', 'false')
      ->count();
    }

    $recordsTotal = DB::table('products')
    ->where('products.isActive', '<>', 'false')
    ->count();
    $arrays =[];
    //return response()->json($datas);

    foreach ($datas as $data) {
      $array=[
        "<img class='shadow-sm border-2' style='width:60px; height:60px; object-fit:cover; border-radius:50%;' src='/{$data->location}' alt='image description'>",
        $data->name,
        $data->type,
        $data->quantity,
        $data->price,
        "<div class='w-10'><button id='dropdownMenuIconButton' data-dropdown-toggle='dropdownDots_{$data->id}' class='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600' type='button'>
        <svg class='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 4 15'>
        <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'/>
        </svg>
        </button>

        <!-- Dropdown menu -->
        <div id='dropdownDots_{$data->id}' style='margin-left:-20px;' class='dropdown-menu absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700 dark:divide-gray-600'>
            <ul class='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownMenuIconButton'>
              <li>
                <button value='{$data->id}' href='#' class='btn_edit block px-2 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Edit</a>
              </li>
              <li>
                <button value='{$data->id}' href='#' class='btn_delete block px-2 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Delete</a>
              </li>
            </ul>
           
        </div>
        </div>"
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
  function AddNew(Request $request){
    //return $request;
    $validated = $request->validate([
    'name' => 'required|string|max:255',
    'price' => 'required|numeric|max:255',
    'type' => 'required|string|max:255',
    'unit_measure' => 'required|string|max:255',
    'description' => 'required|string|max:255',
    'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);
    $profileImage = $request->file('image');
    $imageName = $profileImage->getClientOriginalName();
    $path = $profileImage->storeAs('images/'.Str::random(20), $imageName);
    $validated['location']=$path;
    $validated['file_name']=$imageName;
    if($request['id']==0){
      Product::create($validated);
    }
    else{
      $product = Product::find($request['id']);
      $product->update($validated);
    }
    //$validated['password'] = bcrypt(validated['password']);
    return $validated;
  }
  function Delete($id){
    $product = Product::find($id);
    $product['isActive']=false;
    $product->save();
    return response('success');
  }
  function GetProductById($id){
    return response()->json(Product::find($id));
  }
  function ProductSearch(Request $request){
    $datas = DB::table('products')
    ->select('products.id','products.location','products.name', 'products.type', DB::raw('0 as quantity'), 'products.price')
    ->where('products.name', 'like','%'.$request['term'].'%')
    ->where('products.isActive', '<>', 'false')
    ->limit('10')
    ->get();
    return response()->json($datas);
  }
}
