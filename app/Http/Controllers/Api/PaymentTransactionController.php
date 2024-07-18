<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentTransactionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {   

        // dd($request);
        $sale = Sale::findOrFail($request->id);
        $midtransSecretKey = env('MIDTRANS_SECRET_KEY');
        $midtransUrl = env('MIDTRANS_URL');
        

        $resp = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-type' => 'application/json'
        ])->withBasicAuth(username: $midtransSecretKey, password: '')->post($midtransUrl,[
            "payment_type"=> "qris",
            "transaction_details"=> [
                "order_id"=> $sale->id,
                "gross_amount"=> $sale->total_price
            ]
        ]);

        if($resp->status() == 200 || $resp->status() == 201){
            $actions = $resp->json("actions");

            if(empty($actions)){
                return response()->json(['message-action-empty' => $resp["status_message"]],500);

            }

            $sale->qris_url = $actions[0]['url'];
            $sale->save();

         

            return response()->json(['qr' => $actions[0]['url']]);
        }

        return response()->json(['message' => $resp->body()],500);


    }
}
