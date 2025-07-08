<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyAdminSecret
{
    public function handle(Request $request, Closure $next)
    {
        $secret = $request->input('admin_secret') ?? $request->header('X-Admin-Secret');
        
        if ($secret !== config('app.admin_register_secret')) {
            return response()->json([
                'message' => 'Invalid admin secret key',
                'success' => false
            ], 401);
        }

        return $next($request);
    }
}