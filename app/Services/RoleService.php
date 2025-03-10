<?php

namespace App\Services;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleShowResource;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Js;
use Symfony\Component\HttpFoundation\Response;

class RoleService
{
    protected RoleRepository $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getRoles(): AnonymousResourceCollection
    {
        return RoleResource::collection(Role::all());
    }

    /**
     * @param RoleRequest $request
     * @return JsonResponse
     */
    public function storeRole(RoleRequest $request): JsonResponse
    {
        $tryToCreateRole = $this->roleRepository->createRole($request->validated());
        if (!$tryToCreateRole) {
            return response()->json(['message' => 'Failed to create role.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Role created successfully.'], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return RoleShowResource|JsonResponse
     */
    public function showRole(int $id): RoleShowResource|JsonResponse
    {
        $role = $this->roleRepository->getRoleWithRelations($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found.'], Response::HTTP_NOT_FOUND);
        }

        return new RoleShowResource($role);
    }

    /**
     * @param RoleRequest $request
     * @param $id
     * @return JsonResponse
     */
    public function updateRole(RoleRequest $request, $id): JsonResponse
    {
        $tryToUpdateRole = $this->roleRepository->updateRole($request->validated(), $id);
        if (!$tryToUpdateRole) {
            return response()->json(['message' => 'Failed to update role.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['message' => 'Role updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyRole(int $id): JsonResponse
    {
        $tryToDeleteRole = $this->roleRepository->deleteRole($id);
        if (!$tryToDeleteRole) {
            return response()->json(['message' => 'Failed to delete role.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json(['message' => 'Role deleted successfully.'], Response::HTTP_OK);
    }
}
