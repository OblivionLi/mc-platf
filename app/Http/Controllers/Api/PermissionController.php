<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Http\Resources\PermissionShowResource;
use App\Services\PermissionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PermissionController extends Controller
{
    protected PermissionService $permissionService;

    public function __construct(PermissionService $permissionService) {
        $this->permissionService = $permissionService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->permissionService->getPermissions();
    }

    /**
     * @param PermissionRequest $request
     * @return JsonResponse
     */
    public function store(PermissionRequest $request): JsonResponse
    {
        return $this->permissionService->storePermission($request);
    }

    /**
     * @param int $id
     * @return PermissionShowResource|JsonResponse
     */
    public function show(int $id): PermissionShowResource|JsonResponse
    {
        return $this->permissionService->showPermission($id);
    }

    /**
     * @param PermissionRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(PermissionRequest $request, int $id): JsonResponse
    {
        return $this->permissionService->updatePermission($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->permissionService->destroyPermission($id);
    }
}
