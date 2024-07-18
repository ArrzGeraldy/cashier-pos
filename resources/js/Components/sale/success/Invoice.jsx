import ItemsSaleList from "@/Components/shared/sale/ItemsSaleList";
import { toRupiah } from "@/lib/utils";
import React, { forwardRef } from "react";

const Invoice = forwardRef((props, ref) => {
    const { sale, saleDetails } = props;

    return (
        <div ref={ref} className="w-1/2 mx-auto">
            <h1 className="text-center">Invoice</h1>
            <div>
                <p>Sale ID: {sale.id}</p>
                <p>Payment Type: {sale.payment_type}</p>
            </div>
            <p className="font-semibold mt-2">Items</p>
            <ItemsSaleList saleItems={saleDetails} />
            <div className="flex items-center justify-between font-semibold mt-2">
                <p>Total: </p> <span>{toRupiah(sale.total_price)}</span>
            </div>

            <div className="flex items-center justify-between font-semibold mt-2">
                <p>Payment: </p> <span>{toRupiah(sale.total_payment)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold mt-2">
                <p>Changes: </p> <span>{toRupiah(sale.money_changes)}</span>
            </div>
            {/* <div>
                <h2>Sale Details</h2>
                <ul>
                    {saleDetails.map((detail) => (
                        <li key={detail.id}>
                            <p>Product Name: {detail.product_name}</p>
                            <p>Product Cost: {detail.product_cost}</p>
                            <p>Product Price: {detail.product_price}</p>
                            <p>Quantity: {detail.quantity}</p>
                            <p>Amount: {detail.amount}</p>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
});

export default Invoice;
