<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\LoginUserResource;
use App\Http\Resources\RegisterUserResource;
use App\Http\Resources\UserUpdateResource;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->authService->getUsers();
    }

    /**
     * @param LoginRequest $request
     * @return LoginUserResource|JsonResponse
     * @throws Exception
     */
    public function login(LoginRequest $request): LoginUserResource|JsonResponse
    {
        return $this->authService->login($request);
    }

    /**
     * @param RegisterRequest $request
     * @return RegisterUserResource|JsonResponse
     * @throws Exception
     */
    public function register(RegisterRequest $request): RegisterUserResource|JsonResponse
    {
        return $this->authService->register($request);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        return $this->authService->logout($request);

    }

    /**
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        return $this->authService->getLoggedUser();
    }

    /**
     * @param UpdateUserRequest $request
     * @return UserUpdateResource|JsonResponse
     */
    public function updateUser(UpdateUserRequest $request): UserUpdateResource|JsonResponse
    {
        return $this->authService->updateUser($request);
    }

    /**
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        return $this->authService->forgotPassword($request);
    }

    /**
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        return $this->authService->resetPassword($request);
    }

    /**
     * @param $token
     * @return JsonResponse
     */
    public function getToken($token): JsonResponse
    {
        return $this->authService->getToken($token);
    }
}
