<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index(Request $request){
        $query = Sale::with('saleDetails')->latest();
        if($request->has('stts')){
            $query->where('status',strtoupper($request->stts));
        }
        $sales = $query->get();
        return Inertia::render("sale/index",[
            'sales' => $sales
        ]);
    }

    public function payment($id){
        $sale = Sale::with("saleDetails")->find($id);
        return Inertia::render("sale/Payment",[
            "sale" => $sale
        ]);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'customerName' => ['required', 'min:2'],
            'items' => ['required', 'array']
        ]);

        $total_price = 0;
        $items = $validatedData['items'];

        $uuid = Str::uuid()->toString();
        DB::beginTransaction();
    
        try {
            $sale = Sale::create([
                'id' => $uuid,
                'customer_name' => $validatedData['customerName'],
                'total_price' => $total_price,
            ]);
    
            foreach ($items as $item) {
                    $product = Product::find($item['id']);
    
                    if (!$product) {
                        throw new \Exception("Product not found");
                    }
    
                    if ($product->stock < $item['quantity']) {
                        throw new \Exception("Stock for product '{$product->name}' not enough.");
                    }
                    $saleData = [
                        'sale_id' => $uuid,
                        'product_name' => $product->name,
                        'product_cost' => $product->cost,
                        'product_price' => $product->price,
                        'final_price' => $product->price,
                        'quantity' => $item['quantity'],
                        'amount' => $product->price * $item['quantity'],
                    ];
             
    
                    $bestDiscount = $product->discounts->filter(function ($discount) use ($item) {
                        return $item['quantity'] >= $discount->minimum_unit;
                    })->sortByDesc('minimum_unit')->first();
    
                    if ($bestDiscount) {
                        $saleData['discount_name'] = $bestDiscount->name;
                        $saleData['discount_min_unit'] = $bestDiscount->minimum_unit;
                        $saleData['discount_value'] = $bestDiscount->value;
                        $saleData['discount_percentage'] = $bestDiscount->percentage;
                        $saleData['final_price'] = $product->price - $bestDiscount->value;
                        $saleData['amount'] = ($product->price - $bestDiscount->value) * $item['quantity'];
    
                    } 
                    
                    // Mengurangi stok produk
                    $product->stock -= $item['quantity'];
                    $product->save();
    
                    // Membuat detail penjualan
                    $saleDetails = SaleDetails::create($saleData);
    
                    $total_price += $saleDetails->amount;
            }

            // Mengupdate total price pada sale
            $sale->total_price = $total_price;
            $sale->save();

            DB::commit();
    
            return redirect()->route('payment', ['id' => $sale->id]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('message', ['error' => $e->getMessage()]);
        }
        
    }



    public function success($id){
        $sale = Sale::with('saleDetails')->find($id);
        return Inertia::render("sale/Success",[
            "sale" => $sale
        ]);
    }

    public function updateStatus(Request $request,$id){
        $sale = Sale::find($id);
        if($sale->status == $request->updateValue){
            return redirect()->back();
        }

        $stts = "";
        
        if($request->updateValue == "UNPAID"){
            $sale->total_payment = 0;
            $sale->payment_type = null;
            $sale->money_changes = 0;
            $stts = "UNPAID";
            $sale->status = "UNPAID";
        } else if($request->updateValue == "CANCEL"){
            $sale->total_payment = 0;
            $sale->money_changes = 0;
            $stts = "CANCEL";
            $sale->status = "CANCEL";

        }
        
        $sale->save();
        return redirect()->route('sale.index')->with('message' , "Status updated to $stts successfuly");
    }

    public function destroy($id){
        $sale = Sale::findOrFail($id);

        $sale->delete();

        return redirect()->route('sale.index')->with('message' , 'Sale deleted successfuly');
    }

    public function cancel(Request $request){
        $sale = Sale::findOrFail($request->id);
        if($sale){
            
            $sale->status = "CANCEL";
            $sale->total_payment = 0;
            $sale->money_changes = 0;
            $sale->save();
            return redirect()->route("cashier.index")->with("message",[
                'type' =>"info",
                'msg' => "Order $sale->id canceled"
            ]);
        } else {
            return redirect()->back();

        }
    }
}
