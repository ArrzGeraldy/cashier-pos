<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller{

    public function index(){
        $salesQuery = Sale::paid();
        $expense = Expense::all()->sum('amount');
        $totalSale =  $salesQuery->count();

        $revenue = 0;
        $cost = 0;


        foreach ($salesQuery->with('saleDetails')->get() as $sale) {
            foreach ($sale->saleDetails as $saleDetail) {
                $revenue += $saleDetail->product_price;
                $cost += $saleDetail->product_cost;
            }
        }

        $profit = $revenue - $cost;

        $oneWeekAgo = Carbon::now()->subWeek();
        $salesLastWeek = $salesQuery->whereBetween('created_at', [$oneWeekAgo, Carbon::now()])->get();
        
        $salesCountByDate = [];
        foreach ($salesLastWeek as $sale) {
            $date = $sale->created_at->format('M j');
            if (!isset($salesCountByDate[$date])) {
                $salesCountByDate[$date] = 0;
            }
            $salesCountByDate[$date]++;
        }

        uksort($salesCountByDate, function($a, $b) {
            return strtotime($a) - strtotime($b);
        });

        // Prepare chart data
        $chartData = [];
        foreach ($salesCountByDate as $date => $count) {
            $chartData[] = [
                "day" => $date,
                "sale" => $count,
            ];
        }

        $data = [
            'revenue' => $revenue,
            'profit' => $profit,
            'chartData' => $chartData,
            'expense' => $expense,
            'totalSale' => $totalSale
        ];

        

        return Inertia::render("dashboard/index", [
            "title" => "Dashboard",
            'data' => $data
        ]);
    }

}
