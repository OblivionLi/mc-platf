<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportPlayerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_reported' => $this->user_reported,
            'admin_name' => $this->admin_name,
            'title' => $this->title,
            'status' => $this->status,
            'description' => $this->description,
            'image' => $this->image,
            'users' => $this->users
        ];
    }
}
