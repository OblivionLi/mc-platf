<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Stripe\Collection;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read Collection<User> $users
 */
class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray(Request$request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'users' => $this->whenLoaded('users')
        ];
    }
}
