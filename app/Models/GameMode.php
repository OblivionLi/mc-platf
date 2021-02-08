<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameMode extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image'
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function scopeInfo($query) {
        return $query->with('users');
    }
}
