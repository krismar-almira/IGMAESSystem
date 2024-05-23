<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UsersPageController;
use App\Http\Controllers\Admin\UserRegistrationController;
use App\Http\Controllers\Admin\Configuration\UserController;
use App\Http\Controllers\Admin\Configuration\UserLevelController;


Route::get('/login',[LoginController::class,'ViewLoginPage']);
Route::post('/login', [LoginController::class,'Login']);
Route::post('/logout', [LoginController::class,'Logout']);

Route::middleware(['AdminAccess'])->group(function () {
  Route::get('/', function(){return redirect('/admin/dashboard');});
  Route::prefix('/admin')->group(function () {
    Route::prefix('/dashboard')->group(function () {
      Route::get('/', [DashboardController::class, 'index']);
    });
    
    Route::prefix('user')->group(function () {
      Route::get('/registration',[UserRegistrationController::class, 'index']);
      Route::get('/users',[UsersPageController::class, 'index']);
    });



    Route::prefix('user')->group(function () {
      Route::post('/',[UserController::class,'save']);
      Route::get('/',[UserController::class,'All']);
      
      Route::post('/logout',[UserController::class,'logout']);
    });
    //Route::get('/', [UserLevelController::class, 'GetAll']);
    Route::get('/userlevel', [UserLevelController::class, 'GetAll']);
  });

});