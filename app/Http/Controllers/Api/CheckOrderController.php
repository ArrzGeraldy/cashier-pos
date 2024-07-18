<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class CheckOrderController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $order = Order::findOrFail($request->id);

        if($order){
            return response()->json(['status' => $order->status],200);
        }

        return response()->json(['message' => 'order not found'],400);
    }
}
