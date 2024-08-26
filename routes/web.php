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

    Route::resource('user', UserController::class)->except('create', 'show', 'edit');

    Route::resource('destroy-ribbon', DestroyRibbonController::class)->except('create', 'show', 'edit');

    Route::resource('model-for-material', ModelForMaterialController::class)->except('create', 'show', 'edit');

    Route::resource('po-item', PoItemController::class)->except('create', 'show', 'edit');
    Route::post('po-item/import-file', [PoItemController::class, 'import'])->name('po-item.import');

    Route::resource('report-print', ReportPrintController::class)->except('create', 'show', 'edit');
    Route::post('report-print/import-file', [ReportPrintController::class, 'import'])->name('report-print.import');

    Route::resource('schedule-print', SchedulePrintController::class)->except('create', 'show', 'edit');
    Route::post('schedule-print/generate', [SchedulePrintController::class, 'generate'])->name('schedule-print.generate');
    Route::post('schedule-print/sync-to-printed', [SchedulePrintController::class, 'syncToPrinted'])->name('schedule-print.sync-to-printed');
    Route::put('schedule-print/printing/{id}', [SchedulePrintController::class, 'printing'])->name('schedule-print.printing');

    Route::resource('material', MaterialController::class)->except('create', 'show', 'edit');

    Route::resource('transaction-material', TransactionMaterialController::class)->except('create', 'show', 'edit');

    Route::get('notifications', [NotificationController::class, 'index'])->name('notification.index');
    Route::put('notifications/{id}', [NotificationController::class, 'read'])->name('notification.read');
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy'])->name('notification.destroy');


    // Route::get('/testing', function () {
    //    //
    // });
});

require __DIR__ . '/auth.php';