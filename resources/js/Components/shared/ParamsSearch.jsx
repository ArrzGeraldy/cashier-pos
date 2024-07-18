import { router } from "@inertiajs/react";
import { Tag, X } from "lucide-react";
import React from "react";

const ParamsSearch = ({ endpoint }) => {
    let searchParams = new URLSearchParams(window.location.search);
    const paramsSearch = searchParams.get("q") || null;
    return (
        paramsSearch && (
            <div className="bg-black mt-4 text-sm text-white w-fit px-3 flex rounded-md items-center gap-2 py-1.5">
                <Tag size={14} />
                <span>{paramsSearch}</span>
                <button
                    aria-label="params-search"
                    onClick={() => router.get(`/${endpoint}`)}
                >
                    <X size={16} />
                </button>
            </div>
        )
    );
};

export default ParamsSearch;
