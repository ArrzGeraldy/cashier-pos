import { toRupiah } from "@/lib/utils";
import {
    BadgeDollarSign,
    CircleDollarSign,
    CornerLeftDown,
    Package2,
} from "lucide-react";
import React from "react";

const StatisticsCards = ({ revenue, totalSale, profit, expense }) => {
    return (
        <div className="grid lg:grid-cols-4 gap-4 mt-4 ">
            <div className="bg-white px-4 py-4 rounded-md shadow-md border border-slate-200">
                <div className="flex gap-2 items-center">
                    <div className="bg-orange-200 px-3 py-1.5 w-fit rounded-md">
                        <CircleDollarSign
                            strokeWidth={1.5}
                            size={28}
                            className="text-orange-500"
                        />
                    </div>
                    <p className="text-lg">Revenue</p>
                </div>
                <div className="text-xl font-semibold mt-4">
                    {toRupiah(revenue)}
                </div>
            </div>
            <div className="bg-white px-4 py-4 rounded-md shadow-md border border-slate-200">
                <div className="flex gap-2 items-center">
                    <div className="bg-red-200 px-3 py-1.5 w-fit rounded-md">
                        <CornerLeftDown
                            strokeWidth={1.5}
                            size={28}
                            className="text-red-500"
                        />
                    </div>
                    <p className="text-lg">Expense</p>
                </div>
                <div className="text-xl font-semibold mt-4">
                    {toRupiah(expense)}
                </div>
            </div>

            <div className="bg-white px-4 py-4 rounded-md shadow-md border border-slate-200">
                <div className="flex gap-2 items-center">
                    <div className="bg-blue-200 px-3 py-1.5 w-fit rounded-md">
                        <BadgeDollarSign
                            strokeWidth={1.5}
                            size={28}
                            className="text-blue-500"
                        />
                    </div>
                    <p className="text-lg">Profit</p>
                </div>
                <div className="text-xl font-semibold mt-4">
                    {toRupiah(profit)}
                </div>
            </div>
            <div className="bg-white px-4 py-4 rounded-md shadow-md border border-slate-200">
                <div className="flex gap-2 items-center">
                    <div className="bg-indigo-200 px-3 py-1.5 w-fit rounded-md">
                        <Package2
                            strokeWidth={1.5}
                            size={28}
                            className="text-indigo-500"
                        />
                    </div>
                    <p className="text-lg">Total Sale</p>
                </div>
                <div className="text-xl font-semibold mt-4">{totalSale}</div>
            </div>
        </div>
    );
};

export default StatisticsCards;
