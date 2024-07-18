import { router } from "@inertiajs/react";
import { Printer } from "lucide-react";
import React from "react";
import { useReactToPrint } from "react-to-print";

const BtnAction = ({ invoiceRef, id }) => {
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });

    const handleDone = () => {
        router.get("/cashier");
    };

    const handleCancel = () => {
        router.patch("/sale/cancel", {
            id,
        });
    };
    return (
        <div className="grid grid-cols-2 py-4 gap-4 mt-2">
            <button
                onClick={handlePrint}
                className="bg-black w-full py-2 hover:bg-slate-800 font-semibold text-white flex items-center justify-center gap-2"
            >
                <Printer size={20} />
                <span>Print</span>
            </button>
            <button
                onClick={handleCancel}
                className="bg-black w-full py-2 hover:bg-slate-800 font-semibold text-white"
            >
                Cancel
            </button>
            <button
                onClick={handleDone}
                className="bg-black w-full col-span-2 py-2 hover:bg-slate-800 font-semibold text-white"
            >
                Done
            </button>
        </div>
    );
};

export default BtnAction;
