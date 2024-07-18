<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Sale;
use Illuminate\Http\Request;

class ReportApiController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        

        if($request->has('startDate') && $request->has('endDate')){
            $startDate = $request->startDate;
            $endDate = $request->endDate;
            $salesQuery = Sale::paid()->whereBetween('created_at', [$startDate, $endDate]);
            $expenses = Expense::whereBetween('created_at', [$startDate, $endDate])->get();
        } else{
            $lastMonthStart = now()->subMonth()->startOfMonth();
            $expenses = Expense::whereBetween('created_at', [$lastMonthStart, now()])->get();
            $salesQuery = Sale::paid()->whereBetween('created_at', [$lastMonthStart, now()]);
        }

        $expenseSum = $expenses->sum('amount');
        $totalSale = $salesQuery->count();


        $revenue = $salesQuery->withRevenueAndCost()->get()->sum(function ($sale) {
            return $sale->saleDetails->sum('revenue');
        });
    
        $cost = $salesQuery->withRevenueAndCost()->get()->sum(function ($sale) {
            return $sale->saleDetails->sum('cost');
        });

        
        $profit = $revenue - $cost;
    
        $salesCountByMonth = $salesQuery->get()->groupBy(function ($sale) {
            return $sale->created_at->format('M');
        });

        $salesCountByMonth = $salesCountByMonth->map(function ($sales) {
            return $sales->pluck('created_at');
        });
     
        $data = [
            'revenue' => $revenue,
            'profit' => $profit,
            'expense' => $expenseSum,
            'totalSale' => $totalSale,
            'salesCountByMonth' => $salesCountByMonth,
        ];

        return response()->json(['data' => $data],200);

    }
}
