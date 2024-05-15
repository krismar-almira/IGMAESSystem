<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SurveyPageController extends Controller
{
    function ViewSurveyForm(){
      return view('frontend.survey.index');
    }
}
