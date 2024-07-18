<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public $title = "Dashboard | Expense";

    public function index(Request $request){
        $query =  Expense::latest();

        if ($request->has('q') && $request->q != '') {
            $query->where('expense_category', 'LIKE', '%' . $request->q . '%');
        }

        $expenses = $query->get();

        return Inertia::render("expense/index",[
            'expenses' => $expenses,
            'title' => $this->title
        ]);
    }
    
    public function add(){
        return Inertia::render("expense/Add",[
            'title' => $this->title
        ]);

    }

    public function store(Request $request) {
        // dd($request->all());
        $validatedData = $request->validate([
            'expense_category' => ['required', 'min:3', 'max:200', 'string'],
            'amount' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
        ]);

        Expense::create($validatedData);

        return redirect()->route('expense')->with('message', 'Expense created successfully!');
    }

    public function edit($id){
        $expense = Expense::findOrFail($id);

        return Inertia::render('expense/Edit',[
            'title' => $this->title,
            'expense' => $expense
        ]);
    }

    public function update(Request $request,$id) {
        // dd($request->all());
        $expense = Expense::findOrFail($id);
        $validatedData = $request->validate([
            'expense_category' => ['required', 'min:3', 'max:200', 'string'],
            'amount' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
        ]);


        $expense->expense_category = $validatedData['expense_category'];
        $expense->amount = $validatedData['amount'];
        $expense->description = $validatedData['description'];

        $expense->save();

        return redirect()->route('expense')->with('message', 'Expense updated successfully!');
    }

    public function destroy($id){
        $expense = Expense::findOrFail($id);

        $expense->delete();

        return redirect()->back()->with('message',"$expense->expense_category deleted successfully!");


    }
}
