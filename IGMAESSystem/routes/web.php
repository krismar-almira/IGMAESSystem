<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UsersPageController;
use App\Http\Controllers\Admin\ProductPageController;
use App\Http\Controllers\Admin\InventoryPageController;
use App\Http\Controllers\Admin\UserRegistrationController;
use App\Http\Controllers\Admin\Configuration\UserController;
use App\Http\Controllers\Admin\Configuration\PayrollController;
use App\Http\Controllers\Admin\Configuration\ProductController;
use App\Http\Controllers\Admin\Configuration\InventoryController;
use App\Http\Controllers\Admin\Configuration\UserLevelController;
use App\Http\Controllers\Admin\PurchaseController;

Route::get('/login',[LoginController::class,'ViewLoginPage']);
Route::post('/login', [LoginController::class,'Login']);
Route::post('/logout', [LoginController::class,'Logout']);

Route::middleware(['AdminAccess'])->group(function () {
  Route::get('/', function(){return redirect('/admin/dashboard');});
  Route::prefix('/admin')->group(function () {
    Route::prefix('/dashboard')->group(function () {
      Route::get('/', [DashboardController::class, 'index']);
      Route::get('/production', [DashboardController::class, 'production']);
      Route::get('/topeselling', [DashboardController::class, 'GetTopSellingProducts']);
      Route::get('/purchase', [DashboardController::class, 'getPurchaseData']);
      Route::get('/profit', [DashboardController::class, 'getCompanyProfit']);
    });
    Route::prefix('user')->group(function () {
      Route::get('/registration',[UserRegistrationController::class, 'index']);
      Route::get('/users',[UsersPageController::class, 'index']);
      Route::get('/getUserSearch',[UserController::class, 'UserSerach']);

    });
    Route::prefix('products')->group(function () {
      Route::get('/',[ProductPageController::class, 'index']);
    });
    Route::prefix('inventory')->group(function(){
      Route::get('/',[InventoryPageController::class,'index']);
    });

    Route::prefix('inventory')->group(function(){
      Route::post('/save',[InventoryController::class,'Save']);
      Route::post('/update',[InventoryController::class,'Update']);
      Route::get('/get',[InventoryController::class,'Get']);
      Route::get('/table',[InventoryController::class,'Table']);

    });
    Route::prefix('product')->group(function(){
      Route::get('/',[ProductController::class, 'All']);
      Route::get('/getbynamesearch',[ProductController::class, 'ProductSearch']);
      Route::post('/',[ProductController::class, 'AddNew']);
      Route::post('/update',[ProductController::class, 'AddNew']);
      Route::delete('/{id}',[ProductController::class, 'Delete']);
      Route::get('/id/{id}',[ProductController::class, 'GetProductById']);
    });
    Route::prefix('/payroll')->group(function(){
      Route::get('/',[PayrollController::class, 'index']);
      Route::get('/id',[PayrollController::class, 'getbyid']);
      Route::post('/save',[PayrollController::class,'save']);
      Route::get('/table',[PayrollController::class,'table']);
      Route::get('/getinitial',[PayrollController::class, 'GetInitial']);
      Route::get('/report/{id}',[PayrollController::class,'report']);

    });
    Route::prefix('/purchase')->group(function(){
      Route::get('/request', [PurchaseController::class,'pruchaseRequestPage']);
      Route::post('/request', [PurchaseController::class,'add']);
      Route::delete('/request/{id}', [PurchaseController::class,'delete']);

      Route::put('/request/status', [PurchaseController::class,'StatusChange']);

      Route::get('/table', [PurchaseController::class,'Table']);
      Route::get('/preview/{id}', [PurchaseController::class,'PreviewData']);

      Route::get('/inventoryavail/{id}', [PurchaseController::class,'inventoryAvailByProductId']);
    });
    
    Route::prefix('user')->group(function () {
      Route::post('/',[UserController::class,'save']);
      Route::get('/',[UserController::class,'All']);
      Route::get('/search',[UserController::class,'UserSearch']);
      Route::post('/logout',[UserController::class,'logout']);
      Route::get('/getallemployee',[UserController::class, 'GetAllEmployee']);
    });
    //Route::get('/', [UserLevelController::class, 'GetAll']);
    Route::get('/userlevel', [UserLevelController::class, 'GetAll']);
  });

});