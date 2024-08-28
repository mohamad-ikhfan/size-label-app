<?php

use App\Http\Controllers\DestroyRibbonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ModelForMaterialController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PoItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportPrintController;
use App\Http\Controllers\SchedulePrintController;
use App\Http\Controllers\TransactionMaterialController;
use App\Http\Controllers\UserController;
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

Route::redirect('/', 'dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('user')->middleware('permission-user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::post('/', [UserController::class, 'store'])->name('user.store');
        Route::put('/{id}', [UserController::class, 'update'])->name('user.update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    });

    Route::prefix('destroy-ribbon')->group(function () {
        Route::get('/', [DestroyRibbonController::class, 'index'])->name('destroy-ribbon.index');
        Route::post('/', [DestroyRibbonController::class, 'store'])->name('destroy-ribbon.store');
        Route::put('/{id}', [DestroyRibbonController::class, 'update'])->name('destroy-ribbon.update');
        Route::delete('/{id}', [DestroyRibbonController::class, 'destroy'])->name('destroy-ribbon.destroy');
        Route::post('/export', [DestroyRibbonController::class, 'export'])->name('destroy-ribbon.export');
        Route::get('/download', [DestroyRibbonController::class, 'download'])->name('destroy-ribbon.download');
    });

    Route::prefix('model-for-material')->group(function () {
        Route::get('/', [ModelForMaterialController::class, 'index'])->name('model-for-material.index');
        Route::post('/', [ModelForMaterialController::class, 'store'])->name('model-for-material.store')->middleware('permission-user');
        Route::put('/{id}', [ModelForMaterialController::class, 'update'])->name('model-for-material.update')->middleware('permission-user');
        Route::delete('/{id}', [ModelForMaterialController::class, 'destroy'])->name('model-for-material.destroy')->middleware('permission-user');
    });

    Route::prefix('po-item')->group(function () {
        Route::get('/', [PoItemController::class, 'index'])->name('po-item.index');
        Route::post('/', [PoItemController::class, 'store'])->name('po-item.store')->middleware('permission-user');
        Route::put('/{id}', [PoItemController::class, 'update'])->name('po-item.update')->middleware('permission-user');
        Route::delete('/{id}', [PoItemController::class, 'destroy'])->name('po-item.destroy')->middleware('permission-user');
        Route::post('/import-file', [PoItemController::class, 'import'])->name('po-item.import')->middleware('permission-user');
    });

    Route::prefix('report-print')->group(function () {
        Route::get('/', [ReportPrintController::class, 'index'])->name('report-print.index');
        Route::post('/', [ReportPrintController::class, 'store'])->name('report-print.store');
        Route::put('/{id}', [ReportPrintController::class, 'update'])->name('report-print.update');
        Route::delete('/{id}', [ReportPrintController::class, 'destroy'])->name('report-print.destroy');
        Route::post('/import-file', [ReportPrintController::class, 'import'])->name('report-print.import')->middleware('permission-user');
    });

    Route::prefix('schedule-print')->group(function () {
        Route::get('/', [SchedulePrintController::class, 'index'])->name('schedule-print.index');
        Route::post('/', [SchedulePrintController::class, 'store'])->name('schedule-print.store');
        Route::put('/{id}', [SchedulePrintController::class, 'update'])->name('schedule-print.update');
        Route::delete('/{id}', [SchedulePrintController::class, 'destroy'])->name('schedule-print.destroy');
        Route::post('/generate', [SchedulePrintController::class, 'generate'])->name('schedule-print.generate')->middleware('permission-user');
        Route::post('/sync-to-printed', [SchedulePrintController::class, 'syncToPrinted'])->name('schedule-print.sync-to-printed');
        Route::put('/printing/{id}', [SchedulePrintController::class, 'printing'])->name('schedule-print.printing');
    });

    Route::prefix('material')->middleware('permission-user')->group(function () {
        Route::get('/', [MaterialController::class, 'index'])->name('material.index');
        Route::post('/', [MaterialController::class, 'store'])->name('material.store');
        Route::put('/{id}', [MaterialController::class, 'update'])->name('material.update');
        Route::delete('/{id}', [MaterialController::class, 'destroy'])->name('material.destroy');
    });

    Route::prefix('transaction-material')->group(function () {
        Route::get('/', [TransactionMaterialController::class, 'index'])->name('transaction-material.index');
        Route::post('/', [TransactionMaterialController::class, 'store'])->name('transaction-material.store');
        Route::put('/{id}', [TransactionMaterialController::class, 'update'])->name('transaction-material.update');
        Route::delete('/{id}', [TransactionMaterialController::class, 'destroy'])->name('transaction-material.destroy');
    });

    Route::put('notifications/{id}', [NotificationController::class, 'read'])->name('notification.read');
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy'])->name('notification.destroy');


    // Route::get('/testing', function () {
    //    //
    // });
});

require __DIR__ . '/auth.php';