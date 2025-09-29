<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StateController;

// Auth públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Lectura pública
Route::get('/posts',           [PostController::class, 'index']);
Route::get('/posts/{post}',    [PostController::class, 'show']);
Route::get('/categories',      [CategoryController::class, 'index']);
Route::get('/states',          [StateController::class, 'index']);

// Protegidas (requieren token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/posts',  [PostController::class, 'store']); // crear post
});
