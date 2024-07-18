import React, { useState } from "react";

const useProducts = () => {
    const [isLoading, setIsLoading] = useState(false);

    const url = import.meta.env.VITE_APP_URL;

    const fetchProductsByName = async (
        value,
        setSearchResults,
        setErrorMessage
    ) => {
        setIsLoading(true);
        const res = await fetch(
            `${url}/api/products/search-by-name?name=${value}`
        );

        const json = await res.json();
        setIsLoading(false);
        if (!res.ok) {
            setErrorMessage(json.message);
            return;
        }

        setSearchResults(json.data);
    };

    return { isLoading, fetchProductsByName };
};

export default useProducts;
