<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RankResource extends JsonResource
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
            'type' => $this->type,
            'name' => $this->name,
            'price' => $this->price,
            'discount' => $this->discount,
            'kit' => $this->kit,
            'money' => $this->money,
            'protection_blocks' => $this->protection_blocks,
            'full_access' => $this->full_access,
            'server_config' => $this->server_config,
            'bypass_uri' => $this->bypass_uri,
            'essentials' => $this->essentials,
            'mute' => $this->mute,
            'kick' => $this->kick,
            'temp_ban' => $this->temp_ban,
            'fly' => $this->fly,
            'clear_chat' => $this->clear_chat,
            'keep_inv' => $this->keep_inv,
            'keep_exp' => $this->keep_exp,
            'jail' => $this->jail,
            'nickname' => $this->nickname,
            'world_edit' => $this->world_edit,
            'enderchat' => $this->enderchat,
            'gamemode' => $this->gamemode,
            'color_nickname' => $this->color_nickname,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
