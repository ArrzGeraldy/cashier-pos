import { TicketPercent } from "lucide-react";
import React from "react";

const CardDiscount = ({ discount }) => {
    return (
        <div className="bg-gray-300 rounded-md px-2 py-2 flex items-center gap-2">
            <TicketPercent size={36} className="text-slate-800" />
            <div className="">
                <p className="font-semibold">
                    Discount up to {discount.percentage}%{" "}
                    {`(${discount.value})`}
                </p>
                <p className="text-sm">
                    Buy <strong>minimum {discount.minimum_unit} unit</strong> to
                    get the discount
                </p>
            </div>
        </div>
    );
};

export default CardDiscount;
