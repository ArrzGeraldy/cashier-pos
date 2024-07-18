import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const useQris = (qrUrl, id, total) => {
    const [qrImage, setQrImage] = useState(qrUrl);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQrisMidtrans = async () => {
        const url = import.meta.env.VITE_APP_URL;
        setIsLoading(true);
        const res = await fetch(`${url}/api/process-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                id,
                total,
            }),
        });

        const { qr } = await res.json();
        setQrImage(qr);

        setIsLoading(false);
    };

    useEffect(() => {
        !qrUrl && fetchQrisMidtrans();
    }, []);

    useEffect(() => {
        // if (qrImage) {
        // }
        qrUrl !== qrImage && router.reload();
    }, [qrImage]);

    return { qrImage, isLoading };
};
