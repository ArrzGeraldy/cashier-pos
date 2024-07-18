import { toRupiah } from "@/lib/utils";
import React from "react";

const ItemsSaleList = ({ saleItems }) => {
    return (
        <div className="py-2   border-y border-gray-400">
            {saleItems?.map((item, i) => (
                <div
                    key={i}
                    className="flex py-1 justify-between text-sm items-center"
                >
                    <div className=" font-medium">
                        <p>
                            {item.product_name}
                            {item.discount_percentage && (
                                <span className="ms-2 font-normal">{`(Discount ${item.discount_percentage}%)`}</span>
                            )}
                        </p>
                        <p>
                            {toRupiah(item.final_price)} x {item.quantity}
                        </p>
                    </div>
                    <div>{toRupiah(item.amount)}</div>
                </div>
            ))}
        </div>
    );
};

export default ItemsSaleList;
