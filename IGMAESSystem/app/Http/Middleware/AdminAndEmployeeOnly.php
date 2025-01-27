<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminAndEmployeeOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userLevel = Auth::user()->user_level_id;
        if (!($userLevel == 2 || $userLevel == 3 )) {
            return redirect('/admin/purchase/request');
        }
          return $next($request);
    }
}
