<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $primaryKey = 'id'; // Jika sudah tidak perlu di set
    public $incrementing = false;
    protected $keyType = 'string';

    public function orderDetails(){
        return $this->hasMany(OrderDetail::class);
    }

}
