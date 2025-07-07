<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
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

Route::apiResource('products', ProductController::class);

Route::apiResource('users', UserController::class);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Protected routes (require authentication)
// Route::middleware('auth:sanctum')->group(function () {
//     // User routes
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
//     Route::post('/logout', [AuthController::class, 'logout']);
    
//     // Resource routes
//     Route::apiResource('products', ProductController::class);
//     Route::apiResource('users', UserController::class);
    
//     // Add other protected routes here
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Protected routes
    Route::apiResource('products', ProductController::class);
});