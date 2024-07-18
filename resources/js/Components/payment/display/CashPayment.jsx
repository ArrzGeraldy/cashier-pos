import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { notifyError } from "@/lib/toast";
import { toRupiah } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const CashPayment = ({ total, id }) => {
    const [changes, setChanges] = useState(0);
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPayment(value);
    };

    const onPay = () => {
        if (changes < 0) {
            notifyError(`Payment ${toRupiah(changes)}`);
            return;
        }
        setIsLoading(true);

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const products = cartItems.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity,
            };
        });

        router.post(`/payment/cash/${id}`, {
            totalPayment: parseInt(payment),
            moneyChanges: changes,
            products,
        });

        setIsLoading(false);
    };

    useEffect(() => {
        const currPayment = parseInt(payment) || 0;
        const currChanges = parseInt(payment) - total;

        if (currChanges < 0 || !currChanges) {
            setChanges(currPayment - total);
        } else {
            setChanges(currChanges);
        }
    }, [payment]);

    return (
        <div className="w-[90%] mt-4">
            <Toaster />

            <div className="flex font-semibold mt-4 text-lg border-b border-gray-400 pb-2 items-center justify-between">
                <p>Total:</p>
                <p>{toRupiah(total)}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block" htmlFor="">
                        Payment
                    </label>
                    <Input
                        value={payment ? toRupiah(payment) : ""}
                        type="text"
                        onChange={(e) => handlePayment(e)}
                    />
                </div>
                <div>
                    <label htmlFor="" className="mb-1 block">
                        Changes
                    </label>
                    <div className="flex h-10 w-full border border-slate-700 bg-slate-100 cursor-not-allowed px-3 py-2 rounded-md text-sm">
                        {changes < 0 ? toRupiah(0) : toRupiah(changes)}
                    </div>
                </div>
                <Button
                    disabled={isLoading}
                    onClick={onPay}
                    className="w-full bg-black md:col-span-2 mt-1"
                >
                    Pay
                </Button>
            </div>
        </div>
    );
};

export default CashPayment;
