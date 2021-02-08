<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'price',
        'kit',
        'money',
        'protection_blocks',
        'full_access',
        'server_config',
        'bypass_uri',
        'essentials',
        'mute',
        'kick',
        'temp_ban',
        'fly',
        'clear_chat',
        'keep_inv',
        'keep_exp',
        'jail',
        'nickname',
        'world_edit',
        'enderchat',
        'gamemode',
        'color_nickname',
    ];
}
