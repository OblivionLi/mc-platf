<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();

        return OrderResource::collection($orders);
    }

    public function adminIndex()
    {
        $orders = Order::info()->get();
        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order();

        $user_id = Auth::id();

        $order->user_id = $user_id;
        $order->payment_method = $request->paymentMethod;
        $order->status = "PENDING";
        $order->total_price = $request->discountPrice;

        $order->save();

        foreach($request->cartItems as $items) {
            $order->ranks()->attach(
                $items['rank'],
                [
                    'order_id' => $order->id,
                    'rank_id' => $items['rank']
                ]
            );
        }

        $response = [
            'message' => 'Order placed successfully',
            'id' => $order->id
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::info()->find($id);

        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function updateOrderToPaid($id) 
    {
        $order = Order::find($id);

        if($order) {
            $order->is_paid = 1;
            $order->paid_at = Carbon::now();
            $order->status = "PAID";

            $order->save();
        }

        return response()->json($order);
    }

    public function updateOrderToDelivered($id) 
    {
        $order = Order::find($id);

        if($order) {
            $order->is_delivered = 1;
            $order->delivered_at = Carbon::now();
            $order->status = "DELIVERED";

            $order->save();
        }

        return response()->json($order);
    }

    /**
     * Get all orders related to user
     */
    public function getUserOrders($id) 
    {
        $orders = Order::info()->where('user_id', $id)->get();

        return response()->json($orders);
    }
}
