<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRepository
{
    /**
     * @param string $email
     * @return User|null
     * @throws Exception
     */
    public function getUserByEmail(string $email): ?User
    {
        try {
            return User::where('email', $email)->first();
        } catch (QueryException $e) {
            Log::error("Database error retrieving user by email: " . $e->getMessage());
            return null;
        } catch (Exception $e) {
            Log::error("Error retrieving user: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * @param bool $rememberMe
     * @param User $user
     * @return string
     * @throws Exception
     */
    public function createUserToken(bool $rememberMe, User $user): string
    {
        $result = $user->createToken('Personal Access Token');
        if ($rememberMe) {
            $result->token->expires_at = Carbon::now()->addWeeks(4);
        }

        try {
            $result->token->save();
            return $result->accessToken;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error saving user token: " . $e->getMessage());
            throw $e;
        }
    }

    public function createUserWithRoleAndTag(int $roleId, int $tagId, array $requestData)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $requestData['name'],
                'email' => $requestData['email'],
                'password' => Hash::make($requestData['password']),
            ]);

            $user->roles()->attach($roleId);
            $user->tags()->attach($tagId);

            DB::commit();
            return $user;
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error("Database error creating user with role: " . $e->getMessage());
            return null;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error creating user: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * @param mixed $email
     * @param string $token
     * @return bool
     */
    public function tryInsertingToPasswordReset(mixed $email, string $token): bool
    {
        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            return true;
        } catch (Exception $e) {
            Log::error("Failed to store password reset token: " . $e->getMessage());
            return false;
        }
    }

    /**
     * @param User $user
     * @param string $password
     * @return bool
     * @throws Exception
     */
    public function tryResettingPassword(User $user, string $password): bool
    {
        DB::beginTransaction();

        $hashedPassword = Hash::make($password);
        try {
            $user->update([
                'password' => $hashedPassword
            ]);

            DB::table('password_resets')->where('email', $user->email)->delete();
            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error resetting user password: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * @param $token
     * @return array
     */
    public function findToken($token): array
    {
        try {
            return DB::select('select * from password_resets where token = :token', ['token' => $token]);
        } catch (Exception $e) {
            Log::error("Error retrieving user token: " . $e->getMessage());
            return [];
        }
    }

    /**
     * @param int|string|null $id
     * @return User|null
     */
    public function findUser(int|string|null $id): ?User
    {
        return User::with(['roles', 'tags', 'orders'])->find($id);
    }

    /**
     * @return Collection
     */
    public function getUsers(): Collection
    {
        return User::all();
    }

    /**
     * @param int|string|null $id
     * @return User|null
     */
    public function getUserById(int|string|null $id): ?User
    {
        return User::find($id)->first();
    }

    /**
     * @return Collection
     */
    public function getUsersWithRelations(): Collection
    {
        return User::with(['roles.permissions, tags'])->get();
    }

    /**
     * @param string $email
     * @return bool
     */
    public function deleteUser(string $email): bool
    {
        DB::beginTransaction();
        try {
            $user = User::where('email', $email)->first();

            if (!$user) {
                return false;
            }

            $user->roles()->detach();
            $user->tags()->detach();
            $user->orders()->detach();
            $user->delete();

            DB::commit();
            return true;
        } catch (Exception $e) {
            Log::error("Failed to delete user: " . $e->getMessage());
            DB::rollBack();
            return false;
        }
    }

    /**
     * @param string $email
     * @return bool
     */
    public function doesEmailExist(string $email): bool
    {
        $data = User::where('email', $email)->first();
        return $data ?? false;
    }

    /**
     * @param array $requestData
     * @param User $user
     * @return bool
     */
    public function updateUser(array $requestData, User $user): bool
    {
        DB::beginTransaction();

        try {
            $updateData = ['name' => $requestData['name']];

            if (!empty($requestData['email'])) {
                $updateData['email'] = $requestData['email'];
            }

            $user->update($updateData);

            $user->roles()->sync($requestData['roles']);

            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Failed to update user: " . $e->getMessage());
            return false;
        }
    }
}
