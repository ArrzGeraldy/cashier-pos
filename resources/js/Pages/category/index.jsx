import PosLayout from "@/Layouts/PosLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

import CategoryList from "@/Components/category/CategoryList";
import { notifySuccess } from "@/lib/toast";
import SearchInput from "@/Components/shared/SearchInput";
import ParamsSearch from "@/Components/shared/ParamsSearch";

const index = (props) => {
    const { auth } = props;

    useEffect(() => {
        if (props.flash.message) {
            notifySuccess(props.flash.message);
        }
    }, [props.flash.message]);
    return (
        <PosLayout user={auth.user} title={props.title}>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center gap-4 lg:justify-between">
                <Link
                    href="/category/add"
                    className="px-4 py-2 rounded-md bg-black font-semibold text-white  block w-fit"
                >
                    Add Category
                </Link>
                <SearchInput endpoint={"category"} />
            </div>
            <ParamsSearch endpoint={"category"} />
            <CategoryList categories={props.categories} />
        </PosLayout>
    );
};

export default index;
