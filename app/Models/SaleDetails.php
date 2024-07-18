<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleDetails extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function sale(){
        $this->belongsTo(Sale::class,'sale_id','id');
    }
}
