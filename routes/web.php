<?php

use App\Http\Controllers\StaffPageController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('layouts/main', [
        'title' => 'Event Management',
        'csspath' => 'css/style.css',
        'jspath' => 'js/script.js',
    ]);
});
Route::post('update-staff-input', [EventController::class, 'requestStaffInputs'])->name('update-input');
Route::post('generate-output-table', [EventController::class, 'generateTable'])->name('generate-output');

Route::get('/staff-management', [StaffPageController::class, 'initializeData'])->name('initialize-staff-page');
Route::post('request-add-db', [StaffPageController::class, 'addStaff'])->name('request-add');
Route::post('request-delete-db', [StaffPageController::class, 'deleteStaff'])->name('request-delete');
Route::post('request-edit-db', [StaffPageController::class, 'editStaff'])->name('request-edit');