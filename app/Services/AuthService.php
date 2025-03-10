<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginUserResource;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param LoginRequest $request
     * @return LoginUserResource|JsonResponse
     * @throws Exception
     */
    public function login(LoginRequest $request): LoginUserResource|JsonResponse
    {
        $user = $this->userRepository->getUserByEmail($request->validated()['email']);
        if (!$user) {
            Log::error("Failed to login user (database error)");
            return response()->json(['message' => 'Failed to login user.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if (!Hash::check($request->validated()['password'], $user->password)) {
            $response = ['message' => 'User credentials are incorrect.'];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $accessToken = $this->userRepository->createUserToken($request->remember_me, $user);

        $user->load(['roles.permissions', 'roles.users']);
        return new LoginUserResource(
            $user,
            $accessToken
        );
    }
}
