<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->orderService->getOrders();

    }

    /**
     * @return AnonymousResourceCollection
     */
    public function adminIndex(): AnonymousResourceCollection
    {
        return $this->orderService->getOrders();
    }

    /**
     * @param OrderStoreRequest $request
     * @return JsonResponse
     */
    public function store(OrderStoreRequest $request): JsonResponse
    {
        return $this->orderService->storeOrder($request);
    }

    /**
     * @param int $id
     * @return JsonResponse|OrderResource
     */
    public function show(int $id): JsonResponse|OrderResource
    {
        return $this->orderService->getOrder($id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function updateOrderToPaid(int $id): JsonResponse
    {
        return $this->orderService->updateOrderStatus('PAID', $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function updateOrderToDelivered(int $id): JsonResponse
    {
        return $this->orderService->updateOrderStatus('DELIVERED', $id);
    }

    /**
     * @param int $userId
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function getUserOrders(int $userId): JsonResponse|AnonymousResourceCollection
    {
        return $this->orderService->getUserOrdersList($userId);
    }
}
