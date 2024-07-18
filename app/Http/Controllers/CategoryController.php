<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request){

        $query =  Category::latest();

        if ($request->has('q') && $request->q != '') {
            $query->where('category_name', 'LIKE', '%' . $request->q . '%');
        }

        $categories = $query->get();

        return Inertia::render("category/index",[
            "title" => "Dashboard | Category",
            "categories" => $categories
        ]);
    }

    public function add(){

        return Inertia::render("category/Add",[
            "title" => "Dashboard | Category",

        ]);
    }

    public function store(Request $request){
        $this->validateRequest($request);

        Category::create($request->only('category_name'));

        return redirect()->route('category.index')->with('message', 'Category created successfully!');
    }

    public function edit($id){
        $category = Category::findOrFail($id);

        return Inertia::render("category/Edit",[
            'category'=> $category ,
            'title' => 'Dashboard | Category'
        ]);
    }
    public function update(Request $request,$id){
        $validatedData = $this->validateRequest($request);

        $category = Category::findOrFail($id);
        $category->category_name = $validatedData['category_name'];
        $category->save();

        return redirect()->route('category.index')->with('message', "Category $category->category_name updated successfully!");
        
    }

    public function destroy($id){

        $category = Category::findOrFail($id);

        $categoryProducts = $category->products();

        if($categoryProducts->count() > 0){
            foreach($categoryProducts->get() as $product){
                Storage::disk('public')->delete($product->image);
            }

        }
        
        $category->delete();

        return redirect()->route('category.index')->with('message', "Category $category->category_name deleted successfully!");
    }

    private function validateRequest(Request $request){
        return $request->validate([
            'category_name' => ['required', 'min:2','unique:categories']
        ]);
        
    }
}



