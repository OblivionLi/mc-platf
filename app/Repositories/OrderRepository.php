<?php

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderRepository
{

    /**
     * @return Collection
     */
    public function getOrders(): Collection
    {
        return Order::with(['ranks', 'users'])->get();
    }

    /**
     * @param int $id
     * @return Order|null
     */
    public function getOrder(int $id): ?Order
    {
        return Order::with(['ranks', 'users'])->find($id);
    }

    /**
     * @param array $requestData
     * @return Order|null
     */
    public function storeOrder(array $requestData): ?Order
    {
        try {
            $order = new Order();

            $order->user_id = Auth::id();
            $order->payment_method = $requestData['payment_method'];
            $order->status = "PENDING";
            $order->total_price = $requestData['total_price'];

            $order->save();

            foreach ($requestData['cartItems'] as $items) {
                $order->ranks()->attach(
                    $items['rank'],
                    [
                        'order_id' => $order->id,
                        'rank_id' => $items['rank']
                    ]
                );
            }

            return $order;
        } catch (Exception $e) {
            Log::error('Error while creating order: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * @param string $status
     * @param int $id
     * @return bool
     */
    public function updateOrderStatus(string $status, int $id): bool
    {
        try {
            $order = $this->getOrder($id);
            if (!$order) {
                return false;
            }

            if ($status == 'PAID') {
                $order->is_paid = 1;
                $order->paid_at = Carbon::now();
            } else if ($status == 'DELIVERED') {
                $order->is_delivered = 1;
                $order->delivered_at = Carbon::now();
            }

            $order->status = $status;

            $order->save();

            return true;
        } catch (Exception $e) {
            Log::error('Error while updating order status: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int $userId
     * @return array|Collection
     */
    public function getUserOrdersList(int $userId): array|Collection
    {
        try {
            return Order::with(['ranks', 'users'])->where('user_id', $userId)->get();
        } catch (Exception $e) {
            Log::error('Error while getting user orders list: ' . $e->getMessage());
            return [];
        }
    }
}
