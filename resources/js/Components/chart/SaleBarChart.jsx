import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    // ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
// const chartData = [
//     { day: "January 4", sale: 186 },
//     { day: "February", sale: 305 },
//     { day: "March", sale: 237 },
//     { day: "April", sale: 73 },
//     { day: "May", sale: 209 },
//     { day: "June", sale: 214 },
// ];

const chartConfig = {
    sale: {
        label: "Sale",
        color: "hsl(var(--chart-6))",
    },
};

export function SaleBarChart({ chartData }) {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Last 7 Days Sales</CardTitle>
                <CardDescription>
                    {chartData[0]?.day} - {chartData[chartData.length - 1]?.day}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            // tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="sale"
                            fill="var(--color-sale)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Showing total sale for the last 6 days
                    <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
