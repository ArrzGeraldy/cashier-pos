import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import useProducts from "@/hooks/useProducts";

const SearchProduct = ({ setProduct }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [value] = useDebounce(text, 500);
    const [errorMessage, setErrorMessage] = useState(null);
    const contentRef = useRef();
    const { isLoading, fetchProductsByName } = useProducts();

    const handleFocus = () => {
        setIsOpen(true);

        contentRef.current.classList.add("z-10");
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 100);

        setTimeout(() => {
            contentRef.current.classList.remove("z-10");
        }, 500);
        setErrorMessage("");
        setText("");
    };

    const selectProduct = (result) => {
        setProduct(result);
    };

    const renderResult = () => {
        return searchResults.length > 0 ? (
            searchResults.map((result, i) => (
                <button
                    onClick={() => selectProduct(result)}
                    key={i}
                    className="mt-2 block font-semibold text-sky-600 underline hover:text-sky-500 transition-all"
                >
                    {result.name}
                </button>
            ))
        ) : (
            <div className="flex justify-center mt-4">{errorMessage}</div>
        );
    };

    useEffect(() => {
        if (value) {
            fetchProductsByName(value, setSearchResults, setErrorMessage);
        } else {
            setSearchResults([]);
        }
    }, [value]);
    return (
        <div className="relative">
            <div className="relative flex items-center">
                <Input
                    value={text || ""}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    className="border border-slate-300 shadow-md focus-visible:ring-0  focus-visible:outline-1 "
                    placeholder="Find product"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <button className="absolute right-4">
                    <Search className="text-slate-500 " size={18} />
                </button>
            </div>
            <div className="absolute w-full">
                <div
                    ref={contentRef}
                    className={`product-list-container relative`}
                >
                    <div
                        className={`w-full content-product px-4 py-3 ${
                            isOpen ? "content-product" : "content-product-close"
                        } min-h-32 bg-white rounded-md shadow-md mt-2`}
                    >
                        {isLoading ? (
                            <div className="flex justify-center mt-4">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            renderResult()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
