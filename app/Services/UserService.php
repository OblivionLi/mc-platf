<?php

namespace App\Services;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserUpdateResource;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @return JsonResponse
     */
    public function getUsersWithRelations(): JsonResponse
    {
        return response()->json($this->userRepository->getUsersWithRelations());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function showUser(int $id): JsonResponse
    {
        $user = $this->userRepository->getUserById($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyUser(int $id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $tryToDeleteUser = $this->userRepository->deleteUser($user->email);
        if (!$tryToDeleteUser) {
            return response()->json(['message' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['message' => 'User deleted successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @param UserUpdateRequest $requestData
     * @return UserUpdateResource|JsonResponse
     */
    public function updateUser(int $id, UserUpdateRequest $requestData): UserUpdateResource|JsonResponse
    {
        $user = $this->userRepository->getUserById($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        if ($user->email != $requestData['email']) {
            if ($this->userRepository->doesEmailExist($requestData['email'])) {
                return response()->json(['message' => 'Email already exist.'], Response::HTTP_NOT_FOUND);
            }
        }

        $preparedRequestData = [
            'name' => $requestData['name'],
            'email' => $requestData['email'] != $user->email ? $requestData['email'] : '',
            'roles' => $requestData['roles'],
        ];

        $tryToUpdateUser = $this->userRepository->updateUser($preparedRequestData, $user);
        if (!$tryToUpdateUser) {
            return response()->json(['message' => 'Failed to update user.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new UserUpdateResource($user);
    }


}
