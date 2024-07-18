<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class FindProductController extends Controller{

    public function __invoke(Request $request){

        if (!$request->has('name')) {
            return response()->json([
                'message' => 'Invalid key',
                'data' => []
            ], 400);
        }

        $productName = $request->input('name');

        $products = Product::with('category')->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($productName) . '%'])->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Product not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Product found',
            'data' => $products
        ], 200);
    }

}
