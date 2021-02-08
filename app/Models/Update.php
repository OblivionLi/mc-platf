<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'version',
        'brief_description',
        'full_description',
        'image'
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeInfo($query)
    {
        return $query->with('users');
    }
}
