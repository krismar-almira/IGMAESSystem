<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\IpHelperTrait;

class SurveyController extends Controller
{
  use IpHelperTrait;
  function viewUserIp(){
    return $this->getUserIP();
  }
}
