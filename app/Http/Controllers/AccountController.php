<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public $title = "Account";

    public function index(){
        $users = User::all();
        return Inertia::render('account/index',[
            'title' => $this->title,
            'users' => $users
        ]);
    }
    
    public function create(){
        return Inertia::render('account/Create',[
            'title' => $this->title,
        ]);

    }

    public function destroy($id){
        $user = User::findOrFail($id);

        $user->delete();
        return redirect()->route('account')->with('message', "Account $user->name deleted successfully!");

    }
}
