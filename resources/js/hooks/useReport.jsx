import React, { useState } from "react";

function formatDay(dateString) {
    const date = new Date(dateString);
    return date.getDate();
}

function prepareChartData(salesCountByMonth) {
    const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

    const myData = Object.entries(salesCountByMonth).map((entry) => {
        return {
            label: entry[0],
            sales: entry[1].map((date) => formatDay(date)),
        };
    });
    const newData = myData.map((data) => {
        return {
            label: data.label,
            sale: monthDays.map(
                (day) => data.sales.filter((saleDay) => saleDay == day).length
            ),
        };
    });

    const chartData = newData.map((data) => {
        return data.sale.map((x, i) => {
            return {
                day: i + 1,
                [data.label]: x,
            };
        });
    });

    let combine = [];
    const keys = Object.keys(salesCountByMonth);
    let maxKey = 0;

    for (let i = 0; i < 31; i++) {
        let data = {};

        data["day"] = chartData[maxKey][i].day;
        keys.forEach((key, x) => {
            data[key] = chartData[x][i][key];
        });

        combine.push(data);

        if (maxKey >= keys.length - 1) {
            maxKey = 0;
        } else {
            maxKey++;
        }
    }

    return { labels: newData.map((data) => data.label), chartData: combine };
}

export const useReport = () => {
    const url = import.meta.env.VITE_APP_URL;
    const [report, setReport] = useState({
        revenue: 0,
        totalSale: 0,
        profit: 0,
        expense: 0,
        salesCountByMonth: {},
    });

    const [chartData, setChartData] = useState({});
    const [labels, setLables] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchReport = async (start = null, end = null) => {
        setIsLoading(true);

        let res;
        if (start && end) {
            res = await fetch(
                `${url}/api/report?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
        } else {
            res = await fetch(`${url}/api/report`);
        }
        const json = await res.json();

        const myData = prepareChartData(json.data.salesCountByMonth);
        setChartData(myData.chartData);
        setLables(myData.labels);
        setReport(json.data);
        setIsLoading(false);
    };

    return { report, chartData, labels, isLoading, fetchReport };
};
