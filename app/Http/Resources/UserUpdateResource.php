<?php

namespace App\Http\Resources;

use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $email
 * @property-read Collection<Role> $roles
 */
class UserUpdateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'message' => 'User update success',
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->whenLoaded('roles', function () {
                return $this->roles->pluck('name');
            }),
            'is_admin' => $this->whenLoaded('roles', function () {
                return $this->roles->pluck('is_admin');
            }),
        ];
    }
}
