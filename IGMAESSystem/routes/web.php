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
use App\Http\Middleware\AdminOnly;

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
      Route::get('/client', [DashboardController::class, 'getTopClient']);
      Route::get('/producer', [DashboardController::class, 'getTopProducer']);
      Route::get('/individualemployee', [DashboardController::class, 'employeeInvdividualSalary']);
      Route::get('/productionemployee', [DashboardController::class, 'productionEmployee']);
    });
    Route::prefix('user')->group(function () {
      Route::get('/registration',[UserRegistrationController::class, 'index'])->middleware(AdminOnly::class);
      Route::get('/users',[UsersPageController::class, 'index'])->middleware(AdminOnly::class);
      Route::get('/getUserSearch',[UserController::class, 'UserSerach'])->middleware(AdminOnly::class);
    });
    Route::prefix('products')->group(function () {
      Route::get('/',[ProductPageController::class, 'index'])->middleware(AdminOnly::class);
    });
    Route::prefix('inventory')->group(function(){
      Route::get('/',[InventoryPageController::class,'index'])->middleware(AdminOnly::class);
    });

    Route::prefix('inventory')->group(function(){
      Route::post('/save',[InventoryController::class,'Save'])->middleware(AdminOnly::class);
      Route::post('/update',[InventoryController::class,'Update'])->middleware(AdminOnly::class);
      Route::get('/get',[InventoryController::class,'Get'])->middleware(AdminOnly::class);
      Route::get('/table',[InventoryController::class,'Table'])->middleware(AdminOnly::class);

    });
    Route::prefix('product')->group(function(){
      Route::get('/',[ProductController::class, 'All'])->middleware(AdminOnly::class);
      Route::get('/getbynamesearch',[ProductController::class, 'ProductSearch']);
      Route::post('/',[ProductController::class, 'AddNew'])->middleware(AdminOnly::class);
      Route::post('/update',[ProductController::class, 'AddNew'])->middleware(AdminOnly::class);
      Route::delete('/{id}',[ProductController::class, 'Delete'])->middleware(AdminOnly::class);
      Route::get('/id/{id}',[ProductController::class, 'GetProductById'])->middleware(AdminOnly::class);
    });
    Route::prefix('/payroll')->group(function(){
      Route::get('/',[PayrollController::class, 'index'])->middleware(AdminOnly::class);
      Route::get('/id',[PayrollController::class, 'getbyid'])->middleware(AdminOnly::class);
      Route::post('/save',[PayrollController::class,'save'])->middleware(AdminOnly::class);
      Route::get('/table',[PayrollController::class,'table'])->middleware(AdminOnly::class);
      Route::get('/getinitial',[PayrollController::class, 'GetInitial'])->middleware(AdminOnly::class);
      Route::get('/report/{id}',[PayrollController::class,'report'])->middleware(AdminOnly::class);

    });
    Route::prefix('/purchase')->group(function(){
      Route::get('/request', [PurchaseController::class,'pruchaseRequestPage']);
      Route::get('/requeststore', [PurchaseController::class,'pruchaseRequestStore']);
      Route::post('/request', [PurchaseController::class,'add']);
      Route::delete('/request/{id}', [PurchaseController::class,'delete'])->middleware(AdminOnly::class);

      Route::put('/request/status', [PurchaseController::class,'StatusChange'])->middleware(AdminOnly::class);

      Route::get('/table', [PurchaseController::class,'Table']);
      Route::get('/preview/{id}', [PurchaseController::class,'PreviewData']);

      Route::get('/inventoryavail/{id}', [PurchaseController::class,'inventoryAvailByProductId']);
    });
    
    Route::prefix('user')->group(function () {
      Route::post('/',[UserController::class,'save'])->middleware(AdminOnly::class);
      Route::get('/',[UserController::class,'All'])->middleware(AdminOnly::class);
      Route::get('/search',[UserController::class,'UserSearch'])->middleware(AdminOnly::class);
      Route::post('/logout',[UserController::class,'logout']);
      Route::get('/getallemployee',[UserController::class, 'GetAllEmployee']);
    });
    //Route::get('/', [UserLevelController::class, 'GetAll']);
    Route::get('/userlevel', [UserLevelController::class, 'GetAll']);
  });

});