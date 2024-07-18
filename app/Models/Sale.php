<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $primaryKey = 'id'; // Jika sudah tidak perlu di set
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];



    public function saleDetails() {
        return $this->hasMany(SaleDetails::class, 'sale_id', 'id');
    }

    public function scopePaid($query){
        return $query->where('status','PAID');
    }


    public function scopeWithRevenueAndCost($query){
        return $query->with(['saleDetails' => function ($query) {
            $query->selectRaw('sale_id, SUM(product_price) as revenue, SUM(product_cost) as cost')
                ->groupBy('sale_id');
        }]);
    }
}
