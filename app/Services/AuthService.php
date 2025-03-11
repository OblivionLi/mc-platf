<?php

namespace App\Services;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\LoginUserResource;
use App\Http\Resources\RegisterUserResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserUpdateResource;
use App\Mail\ForgotPassword;
use App\Models\User;
use App\Repositories\RoleRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected UserRepository $userRepository;
    protected RoleRepository $roleRepository;
    protected TagRepository $tagRepository;

    public function __construct(UserRepository $userRepository, RoleRepository $roleRepository, TagRepository $tagRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->tagRepository = $tagRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getUsers(): AnonymousResourceCollection
    {
        return UserResource::collection($this->userRepository->getUsers());
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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();

        $response = ['message' => 'You have been successfully logged out'];
        return response()->json($response, Response::HTTP_OK);
    }

    /**
     * @param RegisterRequest $request
     * @return RegisterUserResource|JsonResponse
     * @throws Exception
     */
    public function register(RegisterRequest $request): RegisterUserResource|JsonResponse
    {
        $role = $this->roleRepository->getOrCreateRole('Guest');

        if (!$role) {
            Log::error("Failed to create role during registration (database error)");
            return response()->json(['message' => 'Failed to create role'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $tag = $this->tagRepository->getOrCreateTag('Player');

        if (!$tag) {
            Log::error("Failed to create tag during registration (database error)");
            return response()->json(['message' => 'Failed to create tag'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $user = $this->userRepository->createUserWithRoleAndTag($role->id, $tag->id, $request->validated());

        if (!$user) {
            Log::error("Failed to create user during registration (database error)");
            return response()->json(['message' => 'Failed to register user'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $accessToken = $this->userRepository->createUserToken($request->remember_me, $user);

        return new RegisterUserResource(
            $user,
            $accessToken
        );
    }

    /**
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'If a matching account was found, a password reset link has been sent to your email address'], Response::HTTP_OK);
        }

        $token = Str::random(90);

        if (!$this->userRepository->tryInsertingToPasswordReset($email, $token)) {
            return response()->json(['message' => 'Failed to send password reset email'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            Mail::to($request->email)->send(new ForgotPassword($user->name, $user->email, $token));
            return response()->json(['message' => 'If a matching account was found, a password reset link has been sent to your email address.'], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("Failed to send password reset email: " . $e->getMessage());
            return response()->json(['message' => 'Failed to send password reset email'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User password change successfully.'], Response::HTTP_OK);
        }

        $isPasswordReset = $this->userRepository->tryResettingPassword($user, $request->password);

        if ($isPasswordReset) {
            return response()->json(['message' => 'User password change successfully.'], Response::HTTP_OK);
        }

        Log::error("Failed to reset password (database error)");
        return response()->json(['message' => 'User password change successfully.'], Response::HTTP_OK);
    }

    /**
     * @param $token
     * @return JsonResponse
     */
    public function getToken($token): JsonResponse
    {
        $userReset = $this->userRepository->findToken($token);
        return response()->json($userReset, Response::HTTP_OK);
    }

    /**
     * @return JsonResponse
     */
    public function getLoggedUser(): JsonResponse
    {
        $user = $this->userRepository->findUser(Auth::id());
        return response()->json($user, Response::HTTP_OK);
    }

    /**
     * @param UpdateUserRequest $request
     * @return UserUpdateResource|JsonResponse
     */
    public function updateUser(UpdateUserRequest $request): UserUpdateResource|JsonResponse
    {
        $user = $this->userRepository->getUserById(Auth::id());

        if (!$user) {
            return response()->json(['message' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        $user->password = $request->password ? Hash::make($request->password) : $user->password;

        try {
            $user->save();
        } catch (Exception $e) {
            Log::error("Failed to update user (database error)");
            return response()->json(['message' => 'Failed to update user.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new UserUpdateResource($user);
    }
}
