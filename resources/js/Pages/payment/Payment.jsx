import BtnDisplay from "@/Components/payment/BtnDisplay";
import CashPayment from "@/Components/payment/display/CashPayment";
import DetailDisplay from "@/Components/payment/display/DetailDisplay";
import QrisPayment from "@/Components/payment/display/QrisPayment";
import HeadLabel from "@/Components/payment/HeadLabel";
import React, { useState } from "react";

const Payment = (props) => {
    const { sale } = props;
    const { sale_details } = sale;
    const [display, setDisplay] = useState("Detail");
    const renderDisplay = () => {
        if (display == "Detail") {
            return (
                <DetailDisplay
                    sale_details={sale_details}
                    total={sale.total_price}
                />
            );
        } else if (display == "Cash") {
            return <CashPayment total={sale.total_price} id={sale.id} />;
        } else if (display == "Qris") {
            return (
                <QrisPayment
                    total={sale.total_price}
                    id={sale.id}
                    qrUrl={sale.qris_url}
                />
            );
        }
    };
    return (
        <div className="w-full rela min-h-screen bg-slate-100 flex flex-col justify-center">
            <div className="w-[90%] lg:w-1/2 mx-auto">
                <BtnDisplay display={display} setDisplay={setDisplay} />
                <div className="min-h-[70vh] px-4 py-4 rounded-b-md shadow-md border border-slate-200 bg-white w-full flex flex-col">
                    <HeadLabel display={display} id={sale.id} />

                    <div className="flex justify-center w-full">
                        {renderDisplay()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
