<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CheckoutController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(config('paypal.PAYPAL_CLIENT_ID'), Response::HTTP_OK);
    }
}
