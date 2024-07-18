import HeadLabel from "@/Components/payment/HeadLabel";
import BtnAction from "@/Components/sale/success/BtnAction";
import Invoice from "@/Components/sale/success/Invoice";
import { toRupiah } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const Success = (props) => {
    const invoiceRef = useRef();
    const { sale } = props;
    const { sale_details } = sale;

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <div className="w-full hidden">
                <Invoice
                    sale={sale}
                    saleDetails={sale_details}
                    ref={invoiceRef}
                />
            </div>
            <div className="lg:w-[35%] w-[90%] md:w-[70%]">
                <div className="flex flex-col gap-1 justify-center items-center text-white bg-black px-4 py-4 rounded-t-lg">
                    <CheckCircle size={32} />
                    <HeadLabel display={"Success"} id={sale.id} />
                </div>

                <div className="w-full  bg-white py-2 px-8 pb-4 border border-slate-300">
                    <div className="text-sm py-2 border-b border-slate-400 font-medium">
                        <div className="flex items-center justify-between">
                            <p>Sale Status: </p>
                            <p className="text-white text-xs font-medium bg-black px-2 py-1 ">
                                {sale.status}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <p>Payment Type: </p>
                            <p className="text-white text-xs font-medium bg-black px-2 py-1 ">
                                {sale.payment_type}
                            </p>
                        </div>
                    </div>
                    <div className="py-2 border-b border-slate-400 ">
                        <div className="flex items-center  py-1  justify-between">
                            <p className="font-medium">Total:</p>
                            <p className="font-medium">
                                {toRupiah(sale.total_price)}
                            </p>
                        </div>
                        <div className="flex items-center  py-1  justify-between">
                            <p className="font-medium">Payment:</p>
                            <p className="font-medium">
                                {toRupiah(sale.total_payment)}
                            </p>
                        </div>
                        <div className="flex items-center  py-1  justify-between">
                            <p className="font-medium">Changes:</p>
                            <p className="font-medium">
                                {toRupiah(sale.money_changes)}
                            </p>
                        </div>
                    </div>

                    <BtnAction id={sale.id} invoiceRef={invoiceRef} />
                </div>
            </div>
        </div>
    );
};

export default Success;
