import SaleList from "@/Components/sale/SaleList";
import PosLayout from "@/Layouts/PosLayout";
import { notifySuccess } from "@/lib/toast";
import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { router } from "@inertiajs/react";

const index = (props) => {
    const { sales } = props;

    const searchParams = new URLSearchParams(window.location.search);
    const sttsParams = searchParams.get("stts")
        ? searchParams.get("stts").toUpperCase()
        : "";

    const handleFIlter = (e) => {
        if (sttsParams == e) return;
        if (e == "all") {
            router.get(`/sale`);
            return;
        } else {
            router.get(`/sale?stts=${e.toLowerCase()}`);
        }
    };
    const { auth } = props;

    useEffect(() => {
        props.flash.message && notifySuccess(props.flash.message);
    }, [props.flash.message]);

    return (
        <PosLayout user={auth.user} title={"Dashboar | Sale"}>
            <Select onValueChange={(e) => handleFIlter(e)}>
                <SelectTrigger className="w-[180px] border-none focus-visible:ring-0 shadow-md">
                    <SelectValue placeholder={sttsParams || "Filter"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="PAID">PAID</SelectItem>
                    <SelectItem value="UNPAID">UNPAID</SelectItem>
                    <SelectItem value="CANCEL">CANCEL</SelectItem>
                </SelectContent>
            </Select>

            <SaleList sales={sales} />
        </PosLayout>
    );
};

export default index;
