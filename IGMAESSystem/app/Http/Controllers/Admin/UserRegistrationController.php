<?php

namespace App\Http\Controllers\Admin;

use App\Models\UserLevel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserRegistrationController extends Controller
{
    function index(){
      return  view('admin.user.userRegistration',['UserLevels'=>UserLevel::all()]);
    }
}
