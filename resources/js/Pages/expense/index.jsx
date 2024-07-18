import ExpenseList from "@/Components/expense/ExpenseList";
import ParamsSearch from "@/Components/shared/ParamsSearch";
import SearchInput from "@/Components/shared/SearchInput";
import PosLayout from "@/Layouts/PosLayout";
import { notifySuccess } from "@/lib/toast";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const index = (props) => {
    const { flash } = props;
    const { expenses } = props;

    useEffect(() => {
        flash.message && notifySuccess(flash.message);
    }, [flash]);
    return (
        <PosLayout title={"Dashboard | Expense"}>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center gap-4 lg:justify-between">
                <Link
                    href="/expense/add"
                    className="px-4 py-2 rounded-md bg-black font-semibold text-white  block w-fit"
                >
                    Add Expense
                </Link>
                <SearchInput endpoint={"expense"} />
            </div>

            <ParamsSearch endpoint={"expense"} />
            <ExpenseList expenses={expenses} />
        </PosLayout>
    );
};

export default index;
