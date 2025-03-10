<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Support\Facades\DB;
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
}
