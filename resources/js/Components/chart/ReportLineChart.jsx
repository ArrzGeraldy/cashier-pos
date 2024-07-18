import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";

const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

export function ReportLineChart({ chartData, labels }) {
    const chartConfig = {};

    labels.forEach((month, i) => {
        const chrtt = {
            label: month,
            color: colors[i],
        };
        chartConfig[month] = chrtt;
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {labels.length > 0 &&
                        `Analytics Sale ${labels[labels.length - 1]} - ${
                            labels[0]
                        }`}
                </CardTitle>
                <div className="flex gap-2 py-2">
                    {labels.length > 0 &&
                        labels.map((label) => (
                            <div
                                key={label}
                                className="flex flex-wrap items-center text-xs gap-2"
                            >
                                <div
                                    className="h-1 w-4"
                                    style={{
                                        backgroundColor:
                                            chartConfig[label].color,
                                    }}
                                ></div>
                                <span>{chartConfig[label].label}</span>
                            </div>
                        ))}
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        {labels?.map((label) => (
                            <Line
                                key={label}
                                dataKey={label}
                                type="monotone"
                                stroke={`var(--color-${label})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
