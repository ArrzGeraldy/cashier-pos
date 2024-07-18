import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchInput = ({ endpoint }) => {
    const [q, setQ] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (q.length > 0 && q.trim() !== "") {
            router.get(`/${endpoint}?q=${q}`);
        }
    };
    return (
        <form onSubmit={submit} className="flex items-center relative">
            <input
                className="bg-white py-2 border focus:outline-none border-gray-300 rounded-md text-sm  px-2 focus:ring-1 lg:w-64 focus:ring-black drop-shadow-md w-full"
                placeholder="Search.."
                onChange={(e) => setQ(e.target.value)}
            />

            <button
                aria-label="search-menu"
                className="text-slate-500 absolute right-4"
            >
                <Search size={20} />
            </button>
        </form>
    );
};

export default SearchInput;
