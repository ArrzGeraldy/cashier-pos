import ProductlList from "@/Components/product/ProductlList";
import ParamsSearch from "@/Components/shared/ParamsSearch";
import SearchInput from "@/Components/shared/SearchInput";
import PosLayout from "@/Layouts/PosLayout";
import { notifySuccess } from "@/lib/toast";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const index = (props) => {
    useEffect(() => {
        if (props.flash.message) {
            notifySuccess(props.flash.message);
        }
    }, [props.flash.message]);
    return (
        <PosLayout user={props.auth.user} title={props.title}>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center gap-4 lg:justify-between">
                <Link
                    href="/product/add"
                    className="px-4 py-2 rounded-md bg-black font-semibold text-white  block w-fit"
                >
                    Add Product
                </Link>
                <SearchInput endpoint={"product"} />
            </div>
            <ParamsSearch endpoint={"product"} />

            <ProductlList products={props.products} />
        </PosLayout>
    );
};

export default index;
