<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportPlayerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
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
