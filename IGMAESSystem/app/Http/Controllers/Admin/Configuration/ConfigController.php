<?php

namespace App\Http\Controllers\Admin\Configuration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
  function ViewConfigPage(){
    return view('admin.configuration.index');
  }
  function ViewAddressPage(){
    return view('admin.configuration.address.address');
  }
  function ViewDepartmentConfigPage(){
    return view('admin.configuration.department.department');
  }
}
