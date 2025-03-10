<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class CheckoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(config('paypal.PAYPAL_CLIENT_ID'), 200);
    }
}
