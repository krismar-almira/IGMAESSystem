<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsersPageController extends Controller
{
  function index(){
    return view('admin.user.users');
  }
}
