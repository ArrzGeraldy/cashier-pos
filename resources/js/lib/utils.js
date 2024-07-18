import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export function toRupiah(number) {
    const formattedNumber = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        currencyDisplay: "symbol",
    }).format(number);

    return formattedNumber.replace("Rp", "Rp.");
}
