<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportBug extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'status',
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
