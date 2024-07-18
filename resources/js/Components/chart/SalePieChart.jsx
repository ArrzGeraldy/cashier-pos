"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { cn } from "@/lib/utils";

const chartConfig = {
    profit: {
        label: "Profit",
        color: "hsl(var(--chart-blue))",
    },
    expense: {
        label: "Expense",
        color: "hsl(var(--chart-red))",
    },
};
export function SalePieChart({ profit, expense }) {
    const chartData = [
        { category: "profit", amount: profit, fill: "var(--color-profit)" },
        { category: "expense", amount: expense, fill: "var(--color-expense)" },
    ];

    const analytic = () => {
        const difference = profit - expense;
        const percentageChange = ((difference / expense) * 100).toFixed(2); // Calculate percentage change

        let comparisonMessage = "";
        if (difference > 0) {
            comparisonMessage = `Profit is higher than expense by ${percentageChange}%`;
        } else if (difference < 0) {
            comparisonMessage = `Expense is higher than profit by ${Math.abs(
                percentageChange
            )}%`;
        } else {
            comparisonMessage = "Profit equals expense";
        }

        return comparisonMessage;
    };

    return (
        <Card className="flex flex-col ">
            <CardHeader className="items-center pb-0">
                <CardTitle>Profit vs Expense</CardTitle>
                <CardDescription>
                    Comparison of profit and expense for the current period
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="category"
                                    hideLabel
                                />
                            }
                        />
                        <Pie data={chartData} dataKey="amount">
                            <LabelList
                                dataKey="category"
                                className="fill-background text-white"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) => chartConfig[value]?.label}
                                style={{ fill: "white" }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div
                    className={cn(
                        "flex items-center gap-2 font-medium leading-none",
                        expense > profit && "text-red-500"
                    )}
                >
                    {analytic()}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing comparison of profit and expense
                </div>
            </CardFooter>
        </Card>
    );
}
