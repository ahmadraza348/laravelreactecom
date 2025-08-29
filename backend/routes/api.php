<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\admin\TempImageController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/active-categories', [CategoryController::class, 'activeCategories']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    
    
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/active-brands', [BrandController::class, 'activeBrands']);
    Route::post('/brands', [BrandController::class, 'store']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
    Route::get('/brands/{id}', [BrandController::class, 'show']);


    Route::get('/sizes', [SizeController::class, 'index']);

    Route::post('/temp-images', [TempImageController::class, 'store']);

    Route::resource('products', ProductController::class);
});
