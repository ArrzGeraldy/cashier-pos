import { Button } from "@/Components/ui/button";
import { useQris } from "@/hooks/useQris";
import { notifyInfo, notifySuccess } from "@/lib/toast";
import { toRupiah } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const QrisPayment = ({ id, total, qrUrl }) => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { qrImage, isLoading } = useQris(qrUrl, id, total);

    const handleCheck = async () => {
        setBtnDisabled(true);
        const url = import.meta.env.VITE_APP_URL;
        const res = await fetch(`${url}/api/sales/status/${id}`);
        const json = await res.json();
        if (res.status == 200) {
            if (json.status == "PAID" || json.status == "SUCCESS") {
                notifySuccess(json.status);
                setTimeout(() => {
                    router.get(`/sale/success/${id}`);
                }, 500);
                setBtnDisabled(false);
            } else {
                notifyInfo(json.status);
            }
        }
        setBtnDisabled(false);
    };

    return (
        <div>
            <Toaster />
            {!isLoading && (
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-center md:text-2xl mt-2">
                        {toRupiah(total)}
                    </p>
                    <img src={qrImage} alt="qr" className="h-56 lg:h-72" />
                    <Button
                        disabled={btnDisabled}
                        onClick={handleCheck}
                        className="w-full bg-black"
                    >
                        Check Status
                    </Button>
                </div>
            )}
        </div>
    );
};

export default QrisPayment;
