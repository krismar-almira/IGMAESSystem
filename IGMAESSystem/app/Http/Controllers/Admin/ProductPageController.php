<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductPageController extends Controller
{
  function index(){
    return view('admin.products.index');
  }
}