<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Mail\ForgotPassword;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail as FacadesMail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function index()
    {
        $users = User::paginate();

        return UserResource::collection($users);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;

                if ($request->remember_me) {
                    $token->expires_at = Carbon::now()->addWeeks(1);
                }

                $token->save();

                $details = User::with('roles.permissions')->where('email', $request->email)->get();

                return response()->json([
                    'message' => 'User login successfully',
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString(),
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles,
                    'details' => $details
                ], 201);
            }
        }

        $response = ['message' => 'User does not exist'];
        return response()->json($response, 422);
    }

    public function register(RegisterRequest $request)
    {
        $role = Role::where('name', 'User')->first();
        $tag = Tag::where('name', 'Player')->first();

        $user = new User();

        $user->role_id = $role->id;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        $user->roles()->attach($role->id);
        $user->tags()->attach($tag->id);

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return response()->json([
            'message' => 'User register successfully',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->roles
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        $response = ['message' => 'You have been successfully logged out'];
        return response()->json($response, 200);
    }

    public function user()
    {
        $user_id = Auth::id();

        $user = User::info()->find($user_id);

        return response()->json($user, 200);
    }

    public function updateUser(Request $request)
    {
        $user_id = Auth::id();

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => [
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user_id)
            ],
            'remember_me' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()->all()], 422);
        }

        $user = User::info()->find($user_id);

        if ($user) {
            $user->name = $request->name;
            $user->email = $request->email;

            if ($request->password) {
                $user->password = bcrypt($request->password);
            }

            $user->save();
        } else {
            $response = ['message' => 'User not found'];
            return response()->json($response, 404);
        }

        return response()->json([
            'message' => 'User update successfully',
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $token = Str::random(60);

        DB::table('password_resets')->insert([
            ['email' => $request->email, 'token' => $token, 'created_at' => Carbon::now()]
        ]);


        $user = User::where('email', $request->email)->first();

        $data = [
            'user' => $user,
            'token' => $token
        ];

        Mail::to($request->email)->send(new ForgotPassword($data));

        $response = ['message' => 'Email sent successfully'];
        return response()->json($response, 200);
    }

    public function resetPassword(Request $request, $email) 
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()->all()], 422);
        }

        $user = User::where('email', $email)->first();

        if ($user) {
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }

            $user->save();

            DB::table('password_resets')->where('email', '=', $email)->delete();
        } else {
            $response = ['message' => 'User not found'];
            return response()->json($response, 404);
        }

        $response = ['message' => 'User update successfully'];
        return response()->json($user, 200);
    }

    public function getToken($token)
    {
        $userReset = DB::select('select * from password_resets where token = :token', ['token' => $token]);

        return response()->json($userReset, 200);
    }
}
