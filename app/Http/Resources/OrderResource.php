<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'payment_method' => $this->payment_method,
            'status' => $this->status,
            'total_price' => $this->total_price,
            'is_paid' => $this->is_paid,
            'is_delivered' => $this->is_delivered,
            'delivered_at' => $this->delivered_at,
            'paid_at' => $this->paid_at,
            'ranks' => $this->ranks,
            'users' => $this->users,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
