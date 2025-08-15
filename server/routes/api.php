<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/signup', [AuthController::class, 'signup']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::apiResource('post', App\Http\Controllers\Api\PostController::class);
    Route::apiResource('analytic', App\Http\Controllers\Api\AnalyticController::class);
    Route::apiResource('category', App\Http\Controllers\Api\CategoryController::class);
    Route::apiResource('comment', App\Http\Controllers\Api\CommentController::class);
    Route::apiResource('media', App\Http\Controllers\Api\MediaController::class);
    Route::apiResource('postmedia', App\Http\Controllers\Api\PostMediaController::class);
    Route::apiResource('postseo', App\Http\Controllers\Api\PostSeoController::class);
    Route::apiResource('setting', App\Http\Controllers\Api\SettingController::class);
});
