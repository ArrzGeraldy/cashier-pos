import DiscountList from "@/Components/discount/DiscountList";
import ParamsSearch from "@/Components/shared/ParamsSearch";
import SearchInput from "@/Components/shared/SearchInput";
import PosLayout from "@/Layouts/PosLayout";
import { notifySuccess } from "@/lib/toast";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const index = (props) => {
    const { message } = props.flash;

    useEffect(() => {
        if (message) {
            notifySuccess(message);
        }
    }, [message]);
    return (
        <PosLayout title={props.title}>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center gap-4 lg:justify-between">
                <Link
                    href="/discount/create"
                    className="px-4 py-2 rounded-md bg-black font-semibold text-white  block w-fit"
                >
                    Create Discount
                </Link>
                <SearchInput endpoint={"discount"} />
            </div>
            <ParamsSearch endpoint={"discount"} />
            <DiscountList discounts={props.discounts} />
        </PosLayout>
    );
};

export default index;
