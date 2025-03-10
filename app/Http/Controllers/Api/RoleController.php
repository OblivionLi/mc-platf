<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleShowResource;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoleController extends Controller
{
    protected RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->roleService->getRoles();
    }

    /**
     * @param RoleRequest $request
     * @return JsonResponse
     */
    public function store(RoleRequest $request): JsonResponse
    {
        return $this->roleService->storeRole($request);
    }

    /**
     * @param int $id
     * @return RoleShowResource|JsonResponse
     */
    public function show(int $id): RoleShowResource|JsonResponse
    {
        return $this->roleService->showRole($id);
    }

    /**
     * @param RoleRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(RoleRequest $request, int $id): JsonResponse
    {
        return $this->roleService->updateRole($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->roleService->destroyRole($id);
    }
}
