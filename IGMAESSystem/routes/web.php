<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UsersPageController;
use App\Http\Controllers\Admin\ProductPageController;
use App\Http\Controllers\Admin\InventoryPageController;
use App\Http\Controllers\Admin\UserRegistrationController;
use App\Http\Controllers\Admin\Configuration\UserController;
use App\Http\Controllers\Admin\Configuration\ProductController;
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
    Route::prefix('products')->group(function () {
      Route::get('/',[ProductPageController::class, 'index']);
    });
    Route::prefix('inventory')->group(function(){
      Route::get('/',[InventoryPageController::class,'index']);
    });
    Route::prefix('product')->group(function(){
      Route::get('/',[ProductController::class, 'All']);
      Route::get('/getbynamesearch/',[ProductController::class, 'ProductSearch']);
      Route::post('/',[ProductController::class, 'AddNew']);
      Route::post('/update',[ProductController::class, 'AddNew']);
      Route::delete('/{id}',[ProductController::class, 'Delete']);

      Route::get('/id/{id}',[ProductController::class, 'GetProductById']);


    });
    Route::prefix('user')->group(function () {
      Route::post('/',[UserController::class,'save']);
      Route::get('/',[UserController::class,'All']);
      Route::get('/search',[UserController::class,'UserSeatch']);
      
      Route::post('/logout',[UserController::class,'logout']);
    });
    //Route::get('/', [UserLevelController::class, 'GetAll']);
    Route::get('/userlevel', [UserLevelController::class, 'GetAll']);
  });

});