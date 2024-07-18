<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscountController extends Controller
{
    public $title = 'Discount';

    public function index()
    {
        $discounts = Discount::with('product')->get();
        return Inertia::render('discount/index',[
            'title' => $this->title,
            'discounts' => $discounts
        ]);
    }


    public function create()
    {
        return Inertia::render('discount/Create',[
            'title' => $this->title
        ]);
    }


    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => ['required', 'min:2', 'string'],
            'minimum_unit' => ['required', 'integer', 'min:1'],
            'value' => ['required', 'integer'],
            'percentage' => ['required', 'integer', 'min:1'],
            'product_id' => ['required', 'integer'],
        ]);
        

        Discount::create($validatedData);
        return redirect()->route('discount')->with('message', 'Discount created successfully!');

    }

    public function edit($id){
        $discount = Discount::find($id);

        $product = Product::with('category')->find($discount->product_id);

        return Inertia::render('discount/Edit',[
            'title' => $this->title,
            'discount' =>$discount,
            'product' => $product
        ]);
    }


    public function update(Request $request, $id){
        $validatedData = $this->validateRequest($request);
        
        $discount = Discount::findOrFail($id);

        $discount->name = $validatedData['name'];
        $discount->minimum_unit = $validatedData['minimum_unit'];
        $discount->value = $validatedData['value'];
        $discount->percentage = $validatedData['percentage'];
        $discount->product_id = $validatedData['product_id'];
        $discount->save();

        return redirect()->route('discount')->with('message', 'Discount updated successfully!');

    }

 
    public function destroy($id)
    {
        $discount = Discount::findOrFail($id);
        $discount->delete();

        return redirect()->route('discount')->with('message', 'Discount deleted successfully!');
    }

    public function validateRequest(Request $request){
        return $request->validate([
            'name' => ['required', 'min:2', 'string'],
            'minimum_unit' => ['required', 'integer', 'min:1'],
            'value' => ['required', 'integer'],
            'percentage' => ['required', 'integer', 'min:1'],
            'product_id' => ['required', 'integer'],
        ]);
    }
}
