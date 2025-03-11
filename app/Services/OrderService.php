<?php

namespace App\Services;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Repositories\OrderRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class OrderService
{
    protected OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getOrders(): AnonymousResourceCollection
    {
        return OrderResource::collection($this->orderRepository->getOrders());
    }

    /**
     * @param OrderStoreRequest $request
     * @return JsonResponse
     */
    public function storeOrder(OrderStoreRequest $request): JsonResponse
    {
        $tryToStoreOrder = $this->orderRepository->storeOrder($request->validated());
        if (!$tryToStoreOrder) {
            return response()->json(['message' => 'Failed to create order.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Order created successfully.', 'id' => $tryToStoreOrder->id], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse|OrderResource
     */
    public function getOrder(int $id): JsonResponse|OrderResource
    {
        $order = $this->orderRepository->getOrder($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found.'], Response::HTTP_NOT_FOUND);
        }

        return new OrderResource($order);
    }

    /**
     * @param string $status
     * @param int $id
     * @return JsonResponse
     */
    public function updateOrderStatus(string $status, int $id): JsonResponse
    {
        $tryToUpdateOrderStatus = $this->orderRepository->updateOrderStatus($status, $id);
        if (!$tryToUpdateOrderStatus) {
            return response()->json(['message' => 'Failed to update order status.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Order status updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $userId
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function getUserOrdersList(int $userId): JsonResponse|AnonymousResourceCollection
    {
        $userOrders = $this->orderRepository->getUserOrdersList($userId);
        if (!$userOrders) {
            return response()->json(['message' => 'User orders not found.'], Response::HTTP_NOT_FOUND);
        }

        return OrderResource::collection($userOrders);
    }
}
