<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'payment_method', 'status', 'total_price', 'is_paid', 'is_delivered', 'delivered_at'
     ];
 
     public function ranks() 
     {
         return $this->belongsToMany(Rank::class, 'order_rank');
     }
 
     public function users()
     {
         return $this->belongsTo(User::class, 'user_id');
     }
 
     public function scopeInfo($query)
     {
         return $query->with('ranks', 'users');
     }
}
