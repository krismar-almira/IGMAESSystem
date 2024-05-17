<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\AddressController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Frontend\SurveyPageController;
use App\Http\Controllers\Admin\Configuration\ConfigController;

Route::get('/', [SurveyPageController::class,'ViewSurveyForm']);
Route::get('/login',[LoginController::class,'ViewLoginPage']);
Route::post('/login', [LoginController::class,'Login']);
Route::post('/logout', [LoginController::class,'Logout']);

Route::middleware(['AdminAccess'])->group(function () {
  Route::prefix('admin')->group(function () {
    Route::prefix('/config')->group(function () {
      Route::get('/', [ConfigController::class,'ViewConfigPage']);
      Route::get('/address',[ConfigController::class, 'ViewAddressPage']);
      Route::get('/department',[ConfigController::class, 'ViewDepartmentConfigPage']);
    });
    Route::prefix('/address')->group(function () {
      Route::get('/regions',[AddressController::class, 'GetAllRegion']);
      Route::get('/province/{id}',[AddressController::class, 'GetProvinceByRegionId']);
      Route::get('/city/{id}',[AddressController::class, 'loadCityByProvinceId']);
      
      Route::post('/region/add',[AddressController::class, 'AddRegion']);
      Route::post('/province/add',[AddressController::class, 'AddProvince']);
      Route::post('/city/add',[AddressController::class, 'AddCity']);
    });
    Route::prefix('/department')->group(function () {
      Route::post('/add',[DepartmentController::class,'Add']);
    });
  });
});
