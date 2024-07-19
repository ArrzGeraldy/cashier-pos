<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Pos\DiscountController;
use App\Http\Controllers\Pos\ExpenseController;
use App\Http\Controllers\Pos\PaymentController;
use App\Http\Controllers\Pos\ReportController;
use App\Http\Controllers\Pos\SaleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/profile/user', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function() {
    Route::controller(DashboardController::class)->group(function(){
        Route::get('/','index');
    });

    Route::controller(ProductController::class)->group(function(){
        Route::get('/product','index')->name("product.index");
        Route::get('/product/add','add');
        Route::post('/product','store');
        Route::get('/product/edit/{id}','edit');
        Route::post('/product/update/{id}','update');
        Route::delete('/product/{id}','destroy');
    });

    Route::controller(CategoryController::class)->group(function(){
        Route::get('/category','index')->name("category.index");
        Route::get('/category/add','add');
        Route::get('/category/edit/{id}','edit');
        Route::patch('/category/update/{id}','update');
        Route::post('/category','store');
        Route::delete('/category/{id}','destroy');
    });

    Route::controller(CashierController::class)->group(function(){
        Route::get('/cashier','index')->name("cashier.index");
    });

    Route::controller(SaleController::class)->group(function(){
        Route::get('/sale','index')->name("sale.index");
        Route::post('/sale','store');
        Route::patch('/sale/cancel','cancel');
        Route::patch('/sale/update/status/{id}','updateStatus');
        Route::delete('/sale/{id}','destroy');
        Route::get('/sale/success/{id}','success')->name("sale.success");
    });

    Route::controller(PaymentController::class)->group(function(){
        Route::get('/payment/{id}','show')->name('payment');
        Route::post('/payment/cash/{id}','cash');
    });

    Route::middleware('super.admin')->group(function(){

        Route::controller(ExpenseController::class)->group(function(){
            Route::get('/expense','index')->name('expense');
            Route::get('/expense/add','add');
            Route::get('/expense/{id}','edit');
            Route::post('/expense','store');
            Route::post('/expense/{id}','update');
            Route::delete('/expense/{id}','destroy');
        });

        Route::controller(DiscountController::class)->group(function(){
            Route::get('/discount','index')->name('discount');
            Route::get('/discount/create','create');
            Route::get('/discount/edit/{id}','edit');
            Route::post('/discount','store');
            Route::put('/discount/update/{id}','update');
            Route::delete('/discount/delete/{id}','destroy');
        });

        Route::controller(ReportController::class)->group(function(){
            Route::get('/report','index')->name('report');
        });
        
        Route::controller(AccountController::class)->group(function(){
            Route::get('/account','index')->name('account');
            Route::get('/account/create','create');
            Route::delete('/account/{id}','destroy');
        });
        
    });
    

});



require __DIR__.'/auth.php';
