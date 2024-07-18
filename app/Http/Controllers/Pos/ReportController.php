<?php

namespace App\Http\Controllers\Pos;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
       
        return Inertia::render('report/index');
    }
    
    
}
