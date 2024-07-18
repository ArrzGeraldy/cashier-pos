<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifyQrisController extends Controller
{
    
    public function __invoke(Request $request){
        $orderId = $request->order_id;
        $statusCode = $request->status_code;
        $grossAmount = $request->gross_amount;
        $midtransSecretKey = env('MIDTRANS_SECRET_KEY');
        
        $signature = hash('sha512', $orderId . $statusCode . $grossAmount . $midtransSecretKey);



        Log::info('notifycation',$request->all());
        if($signature != $request->signature_key){
            return response()->json(['message' => 'invalid signature'],400);
        }

        $order = Order::find($request->order_id);

        if($order ){
            $status = 'PENDING';
            if($request->transaction_status == 'settlement'){
                $order->payment_type = $request->issuer;
                $order->total_payment = $request->gross_amount;
                $status = 'PAID';
            } else if($request->transaction_status == 'expired'){
                $status = 'EXPIRED';
            }

            $order->status = $status;
            $order->save();
        } 

        return response()->json(['message' => 'success']);
    }
}
