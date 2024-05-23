<?php

namespace App\Http\Controllers\Admin\Configuration;

use App\Models\UserLevel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserLevelController extends Controller
{
    function GetAll(){
      return response()->json(UserLevel::all());
    }
}
