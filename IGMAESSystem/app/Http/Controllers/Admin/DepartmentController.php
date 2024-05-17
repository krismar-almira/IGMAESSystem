<?php

namespace App\Http\Controllers\Admin;

use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepartmentController extends Controller
{
  function Add(Request $request){
    $validated = $request->validate(['name'=>'required']);
    $department = new Department();
    $department->name = $validated['name'];
    $department->save();
  }
}
