<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'user_id', 'payment_method', 'status', 'total_price', 'is_paid', 'is_delivered', 'delivered_at'
     ];

     public function ranks(): BelongsToMany
     {
         return $this->belongsToMany(Rank::class, 'order_rank');
     }

     public function users(): BelongsTo
     {
         return $this->belongsTo(User::class, 'user_id');
     }
}
