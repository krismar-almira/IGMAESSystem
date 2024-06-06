<?php

namespace App\Http\Controllers\Admin\Configuration;

use stdClass;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  function Save(Request $request){
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'contact_no' => 'required|string|max:255',
      'address' => 'required|string|max:255',
      'email' => 'required|string|max:255',
      'password' => 'required|string|max:255',
      'designation' => 'required|string|max:255',
      'user_level_id' => 'required|integer|max:255',
      'username' => 'required|string|max:255',

      'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);
    //$validated['password'] = bcrypt(validated['password']);
    $profileImage = $request->file('image');
    $imageName = $profileImage->getClientOriginalName();
    $path = $profileImage->storeAs('images/'.Str::random(20), $imageName);
    $validated['location']=$path;
    $validated['filename']=$imageName;
    User::create($validated);
    return $validated;
  }
  function logout(){
    Auth::logout();
    return redirect('/login');
  }
  function All(Request $request){
  //return $request['start'];
  // name address designation userlevel
  $datas;
  $recordsFiltered;
  if($request['search']['regex']){
    $datas = DB::table('users')->join('user_levels', 'user_levels.id', '=', 'users.user_level_id')
    ->select('users.name', 'users.address', 'users.designation', 'user_levels.name as userlevel')
    ->where('users.name', 'like', '%'.$request['search']['value'].'%')
    ->orWhere('user_levels.name','like', '%'.$request['search']['value'].'%')
    ->orWhere('users.designation','like', '%'.$request['search']['value'].'%')
    ->offset($request['start'])->limit($request['length'])->get();
    $recordsFiltered = DB::table('users')->join('user_levels', 'user_levels.id', '=', 'users.user_level_id')
    ->select('users.name', 'users.address', 'users.designation', 'user_levels.name as userlevel')
    ->where('users.name', 'like', '%'.$request['search']['value'].'%')
    ->orWhere('user_levels.name','like', '%'.$request['search']['value'].'%')
    ->orWhere('users.designation','like', '%'.$request['search']['value'].'%')
    ->count();
  }else{
    $datas = DB::table('users')->join('user_levels', 'user_levels.id', '=', 'users.user_level_id')
    ->select('users.name', 'users.address', 'users.designation', 'user_levels.name as userlevel')
    ->offset($request['start'])->limit($request['length'])->get();
    $recordsTotal = DB::table('users')->count();
    $recordsFiltered = DB::table('users')->count();
  }
  $recordsTotal = DB::table('users')->count();
  $arrays =[];
  foreach ($datas as $data) {
    $array=[$data->name, $data->address, $data->designation, $data->userlevel];
    array_push($arrays,$array);
  }
  $val = new stdClass();
  $val->draw = $request['draw']+1;
  $val->recordsTotal = $recordsTotal;
  $val->recordsFiltered = $recordsFiltered;
  $val->data= $arrays;
    return response()->json($val);;
  }
  function UserSeatch(Request $request){
    $datas = DB::table('users')
    ->select('users.id as id','users.name')
    ->where('users.name', 'like','%'.$request['term'].'%')
    ->limit('10')
    ->get();
    return response()->json($datas);
  }
}
