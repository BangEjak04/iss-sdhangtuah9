<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\LibraryFeatureController;
use Illuminate\Support\Facades\Route;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/about', 'about')->name('about');
});

Route::controller(LibraryController::class)->prefix('library')->name('library.')->group(function () {
    Route::get('/', 'index')->name('index');

    Route::controller(LibraryFeatureController::class)->prefix('feature')->name('feature.')->group(function () {
        Route::get('/solar-system', 'solarSystem')->name('solar-system');
    });
});