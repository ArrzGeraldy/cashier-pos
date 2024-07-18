<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashierController extends Controller
{
    public $title = "Cashier";

    public function index(Request $request){
        $query = Product::with(['category', 'discounts'])->latest();

        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
            
        }
        
        if ($request->has('q') && $request->q != '') {
            $query->where('name', 'LIKE', '%' . $request->q . '%');
        }
    
        $products = $query->get();


        return Inertia::render("cashier/index",[
            "title" => $this->title,
            "products" => $products,
            "categories" => Category::all(),
        ]);
    }
}
