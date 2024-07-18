import { Link } from "@inertiajs/react";
import React from "react";

const ButtonsForm = ({ isLoading, cancelTo }) => {
    return (
        <div className="flex col-span-2 gap-4 justify-end">
            <Link
                href={cancelTo}
                className="bg-gray-200 font-semibold hover:bg-gray-200 transition-all px-4 py-2 rounded-md"
            >
                Cancel
            </Link>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white px-4 py-2 rounded-md"
            >
                Submit
            </button>
        </div>
    );
};

export default ButtonsForm;
