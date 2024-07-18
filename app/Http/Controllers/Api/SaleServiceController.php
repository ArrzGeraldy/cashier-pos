<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleServiceController extends Controller
{
    public function getStatus($id){
        $sale = Sale::findOrFail($id);

        if($sale){
            return response()->json(['status' => $sale->status],200);
        }

        return response()->json(['message' => 'order not found'],400);
    }
    
    // public function getQris($id){
    //     $order = Order::findOrFail($id);
    
    //     if($order){
    //         return response()->json(['qr' => $order->qris_url],200);
    //     }
    
    //     return response()->json(['message' => 'order not found'],400);
    // }
}
