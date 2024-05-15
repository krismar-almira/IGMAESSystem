<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
  function ViewLoginPage(){
    return view('auth.login');
  }
  function Login(Request $request){
    $validated = $request->validate([
      'username' => 'required',
      'password' => 'required'
    ]);
    // $user = new User();
    // $user->username = 'gad';
    // $user->password = 'gad';
    // $user->firstname = 'gad';
    // $user->lastname = 'gad';
    // $user->idnumber = 'gad';
    // $user->office_id = 1;
    // $user->department_id= 1;
    // $user->userlevel_id = 1;
    // $user->save();

    if(Auth()->attempt(['username' => $validated['username']
                            ,'password' => $validated['password']
                            ])
    ){
        $request->session()->regenerate();
        return redirect('/admin');
    }
    return redirect()->back();
  }
  function Logout(){
    Auth::logout();
    return redirect('/login');
  }
}
