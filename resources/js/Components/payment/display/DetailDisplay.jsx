import { toRupiah } from "@/lib/utils";
import React from "react";

const DetailDisplay = ({ sale_details, total }) => {
    return (
        <div className="w-full md:w-3/4 mt-4">
            {sale_details.map((detail, i) => (
                <div
                    key={i}
                    className="flex py-2 border-b border-gray-400 justify-between text-sm items-center"
                >
                    <div className="mt-1 font-medium">
                        <p>
                            {detail.product_name}
                            {detail.discount_percentage && (
                                <span className="ms-2 font-normal">{`(Discount ${detail.discount_percentage}%)`}</span>
                            )}
                        </p>
                        <p>
                            {toRupiah(detail.final_price)} x {detail.quantity}
                        </p>
                    </div>
                    <div>{toRupiah(detail.amount)}</div>
                </div>
            ))}
            <div className="flex font-semibold mt-4 items-center justify-between">
                <p>Total:</p>
                <p>{toRupiah(total)}</p>
            </div>
        </div>
    );
};

export default DetailDisplay;
