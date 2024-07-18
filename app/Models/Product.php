<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    

    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function discounts(){
        return $this->hasMany(Discount::class);
    }


    public function scopeBestDiscount($query, $quantity)
    {
        return $query->whereHas('discounts', function ($query) use ($quantity) {
            $query->where('minimum_unit', '<=', $quantity);
        })
        ->with(['discounts' => function ($query) use ($quantity) {
            $query->where('minimum_unit', '<=', $quantity)->orderBy('minimum_unit', 'desc');
        }])
        ->orderBy('id') // Order by appropriate column in the products table
        ->first();
    }

    // public function getBestDiscount($quantity)
    // {
    //     $bestDiscount = null;
    //     if ($this->discounts) {
    //         foreach ($this->discounts as $discount) {
    //             if ($discount->type == 'Exact' || ($discount->type == 'Minimum' && $quantity >= $discount->unit)) {
    //                 if (is_null($bestDiscount) || $discount->unit > $bestDiscount->unit) {
    //                     $bestDiscount = $discount;
    //                 }
    //             }
    //         }
    //     }
    //     return $bestDiscount;
    // }

    // public function getPriceAfterDiscount($quantity)
    // {
    //     $finalPrice = $this->price;
    //     $bestDiscount = $this->getBestDiscount($quantity);
    //     if ($bestDiscount) {
    //         if ($bestDiscount->type == 'Exact' || ($bestDiscount->type == 'Minimum' && $quantity >= $bestDiscount->unit)) {
    //             $finalPrice = max(0, $this->price - $bestDiscount->value);
    //         }
    //     }
    //     return $finalPrice;
    // }

    // public function getPriceAfterDiscountAttribute()
    // {
    //     if ($this->discount) {
    //         if ($this->discount->type == 'Exact') {
    //             return max(0, $this->price - $this->discount->value);
    //         } elseif ($this->discount->type == 'Minimum' && $this->price >= $this->discount->value) {
    //             return max(0, $this->price - $this->discount->value);
    //         }
    //     }
    //     return $this->price;
    // }
}
