<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/signup', [AuthController::class, 'signup']);

// Public media serving route
Route::get('/media-file/{filename}', function ($filename) {
    // Try storage path first (newer files)
    $storagePath = storage_path('app/public/media/' . $filename);
    
    if (file_exists($storagePath)) {
        $file = file_get_contents($storagePath);
        $mimeType = mime_content_type($storagePath);
        
        return response($file, 200)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline');
    }
    
    // Try public uploads path (older files)
    $uploadsPath = public_path('uploads/' . $filename);
    
    if (file_exists($uploadsPath)) {
        $file = file_get_contents($uploadsPath);
        $mimeType = mime_content_type($uploadsPath);
        
        return response($file, 200)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline');
    }
    
    abort(404);
})->where('filename', '.*');

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
    Route::apiResource('user', App\Http\Controllers\Api\UserController::class);
});
