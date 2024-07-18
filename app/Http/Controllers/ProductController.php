<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller{

    public $title = "Dashboard | Product";

    public function index(Request $request){
        
        $query =  Product::with("category")->latest();

        if ($request->has('q') && $request->q != '') {
            $query->where('name', 'LIKE', '%' . $request->q . '%');
        }

        $products = $query->get();

        return Inertia::render("product/index",[
            "products" => $products,
            "title" => $this->title
        ]);
    }

    public function add(){
        $categories = Category::all();

        return Inertia::render("product/Add",[
            "categories" => $categories,
            "title" => $this->title
        ]);
    }

    public function store(Request $request){

        $validatedData = $request->validate([
            'name' => ['required','min:3','max:200','string','unique:products'],
            'cost' => ['required', 'integer'],
            'price' => ['required', 'integer'],
            'stock' => ['required', 'integer'],
            'category_id' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'file', 'mimes:jpeg,png,jpg', 'max:1024'],
        ],[
            'category_id.required' => 'The category field is required.',
        ]);
   

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/product', 'public');
            $validatedData['image'] = $imagePath;
        }

        Product::create($validatedData);

        return redirect()->route('product.index')->with('message', 'Product created successfully!');


    }

    
    public function edit($id){
        $product = Product::with("category")->findOrFail($id);
        $categories = Category::all();

        return Inertia::render("product/Edit",[
            "product" => $product,
            "categories" => $categories,
            "title" => $this->title
        ]);
        
    }

    public function update(Request $request, $id){
        // dd($request);
        $validatedData = $request->validate([
            'name' => ['required', 'min:3', 'max:200', 'string', 'unique:products,name,' . $id],
            'price' => ['required', 'integer'],
            'cost' => ['required', 'integer'],
            'stock' => ['required', 'integer'],
            'category_id' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'file', 'mimes:jpeg,png,jpg', 'max:1024'],
        ], [
            'category_id.required' => 'The category field is required.',
        ]);
    
        $product = Product::findOrFail($id);
    
        $product->name = $validatedData['name'];
        $product->price = $validatedData['price'];
        $product->cost = $validatedData['cost'];
        $product->stock = $validatedData['stock'];
        $product->category_id = $validatedData['category_id'];
        $product->description = $validatedData['description'] ?? $product->description;
    
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
    
            $path = $request->file('image')->store('uploads/product', 'public');
    
            $product->image = $path;
        }
    
        $product->save();
    
        return redirect()->route('product.index')->with('message', "Product {$product->name} updated successfully!");
    }

    public function destroy($id){
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('product.index')->with('message', "Product $product->name deleted successfully!");
    }

}
