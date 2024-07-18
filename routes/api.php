<?php

use App\Http\Controllers\Api\CheckOrderController;
use App\Http\Controllers\Api\FindProductController;
use App\Http\Controllers\Api\PaymentTransactionController;
use App\Http\Controllers\Api\ReportApiController;
use App\Http\Controllers\Api\SaleServiceController;
use App\Http\Controllers\Api\VerifyQrisController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('process-payment',PaymentTransactionController::class);
Route::post('verify-qris',VerifyQrisController::class);
Route::post('orders/status',CheckOrderController::class);
Route::get('products/search-by-name',FindProductController::class);
Route::get('report',ReportApiController::class);

Route::controller(SaleServiceController::class)->group(function(){
    Route::get('sales/status/{id}','getStatus');
    // Route::get('sales/qr/{id}','getQris')->name("get-qr");
});

