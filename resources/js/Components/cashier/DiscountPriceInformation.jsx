import React from "react";
import { Input } from "../ui/input";
import { toRupiah } from "@/lib/utils";

const DiscountPriceInformation = ({
    productPrice,
    calculateDiscount,
    unit,
}) => {
    const discountMessage = () => {
        if (calculateDiscount > 0) {
            return `You need to buy at least ${unit} unit(s) to qualify for the discount.`;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="info">Price Information</label>
            <div className="flex gap-2 items-center">
                <Input
                    disabled
                    value={toRupiah(productPrice - calculateDiscount)}
                />
                <p className="text-xl text-slate-700">/</p>
                <Input disabled value={`unit`} />
            </div>
            <p className="font-medium">{discountMessage()}</p>
        </div>
    );
};

export default DiscountPriceInformation;
