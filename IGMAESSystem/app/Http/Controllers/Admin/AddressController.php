<?php

namespace App\Http\Controllers\Admin;

use App\Models\City;
use App\Models\Region;
use App\Models\Province;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AddressController extends Controller
{
  function GetAllRegion(){
    $data = Region::all();
    return response()->json($data);
  }
  function GetProvinceByRegionId($id){
    $data = Province::where('region_id', $id)->get();
    return response()->json($data);
  }
  function loadCityByProvinceId($id){
    $data = City::where('province_id', $id)->get();
    return response()->json($data);
  }
  function AddRegion(Request $request){
    $validated = $request->validate([
      'name'=>'required'
    ]);
    $data = new Region();
    $data->name=$validated['name'];
    //return response()->json($data);
    $data->save();
    return response()->json($data);
  }
  function AddProvince(Request $request){
    $validated = $request->validate([
      'name'=>'required',
      'fk'=>'required'
    ]);
    $data = new Province();
    $data->name=$validated['name'];
    $data->region_id=$validated['fk'];
    $data->save();
    return response()->json($data);
  }
  function AddCity(Request $request){
    $validated = $request->validate([
      'name'=>'required',
      'fk'=>'required'
    ]);
    $data = new City();
    $data->name=$validated['name'];
    $data->province_id=$validated['fk'];
    $data->save();
    return response()->json($data);
  }
}
