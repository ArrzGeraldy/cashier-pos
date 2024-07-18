<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function show($id){
        $sale = Sale::with('saleDetails')->find($id);
        return Inertia::render("payment/Payment",[
            "sale" => $sale
        ]);
    }

    public function cash($id,Request $request){

        $sale = Sale::with('saleDetails')->find($id);

        if($sale->total_price <= $request->totalPayment){
            $sale->total_payment = $request->totalPayment;
            $sale->payment_type = 'CASH';
            $sale->money_changes = $request->moneyChanges;
            $sale->status = "PAID";
            
            $sale->save();

            $items = $request->products;
            
            foreach($items as $item){
                $product = Product::find($item['id']);
                $product->stock -= $item['quantity'];
                $product->save();
            }

            return redirect()->route("sale.success",["id" => $sale->id]);
        }
    }
}
