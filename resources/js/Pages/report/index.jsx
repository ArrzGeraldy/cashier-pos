import { ReportLineChart } from "@/Components/chart/ReportLineChart";
import { SalePieChart } from "@/Components/chart/SalePieChart";
import { DatePicker } from "@/Components/shared/DatePicker";
import StatisticsCards from "@/Components/shared/StatisticsCards";
import { useReport } from "@/hooks/useReport";
import PosLayout from "@/Layouts/PosLayout";
import React, { useEffect, useState } from "react";

const Index = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { report, chartData, isLoading, fetchReport, labels } = useReport();

    const handleReset = async () => {
        if (startDate && endDate) {
            await fetchReport(startDate);
        }
        setEndDate(null);
        setStartDate(null);
    };
    const handleFilter = async () => {
        if (!endDate || !startDate) return;
        await fetchReport(startDate, endDate);
    };

    useEffect(() => {
        if (!startDate && !endDate) {
            fetchReport();
        }
    }, []);

    return (
        <PosLayout title={"Report"}>
            <div className="flex gap-4">
                <DatePicker
                    date={startDate}
                    setDate={setStartDate}
                    labelDate={"Start Date"}
                />
                <DatePicker
                    date={endDate}
                    setDate={setEndDate}
                    labelDate={"End Date"}
                />
                <button
                    className="bg-black text-white px-3 hover:bg-slate-800 transition-all py-2 rounded-md font-medium text-sm"
                    disabled={isLoading}
                    onClick={handleFilter}
                >
                    Filter
                </button>
                <button
                    className="bg-black text-white px-3 hover:bg-slate-800 transition-all py-2 rounded-md font-medium text-sm"
                    disabled={isLoading}
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>

            <StatisticsCards
                expense={report.expense}
                profit={report.profit}
                revenue={report.revenue}
                totalSale={report.totalSale}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <ReportLineChart labels={labels} chartData={chartData} />
                <SalePieChart expense={report.expense} profit={report.profit} />
            </div>
        </PosLayout>
    );
};

export default Index;
