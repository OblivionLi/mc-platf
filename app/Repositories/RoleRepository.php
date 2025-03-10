<?php

namespace App\Repositories;

use App\Models\Role;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoleRepository
{

    /**
     * @param array $requestData
     * @return bool
     */
    public function createRole(array $requestData): bool
    {
        try {
            Role::create([
                'name' => $requestData['name'],
                'is_admin' => 0
            ]);

            return true;
        } catch (Exception $e) {
            Log::error("Database error creating role: " . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int|null $id
     * @return Role|Builder|null
     */
    public function getRoleWithRelations(?int $id = null): Role|Builder|null
    {
        $query = Role::query()
            ->select(['id', 'name', 'is_admin', 'created_at', 'updated_at'])
            ->with([
                'permissions:id,name',
            ])
            ->withCount('users');

        if ($id) {
            return $query->with(['users:name,email'])->find($id);
        }

        return $query;
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return Role|null
     */
    public function updateRole(array $requestData, int $id): ?Role
    {
        DB::beginTransaction();
        try {
            $role = Role::find($id);
            if (!$role) {
                return null;
            }

            $role->name = $requestData['name'];
            $role->is_admin = $requestData['is_admin'];

            $role->save();

            $role->permissions()->sync($requestData['perms']);

            DB::commit();
            return $role;
        } catch (Exception $e) {
            Log::error("Database error updating role: " . $e->getMessage());
            DB::rollBack();
            return null;
        }
    }

    /**
     * @param int $id
     * @return bool
     */
    public function deleteRole(int $id): bool
    {
        DB::beginTransaction();

        try {
            $role = Role::find($id);
            if (!$role) {
                return false;
            }

            $role->permissions()->detach();
            $role->users()->detach();

            $role->delete();

            return true;
        } catch (Exception $e) {
            Log::error("Database error deleting role: " . $e->getMessage());
            return false;
        }
    }
}
