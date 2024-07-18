import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import ParamsSearch from "../shared/ParamsSearch";
import SearchInput from "../shared/SearchInput";

const CashIerFilter = ({ categories }) => {
    let searchParams = new URLSearchParams(window.location.search);

    const paramsSearch = searchParams.get("q");
    const paramsCategory = searchParams.get("category") || "";

    const handleSelectChange = (value) => {
        if (value == 0) {
            router.get(`/cashier`);
            return;
        }
        router.get(`/cashier?category=${value}`);
    };

    return (
        <div>
            <div className="mt-4 flex lg:flex-row flex-col justify-between gap-2 lg:items-center">
                <Select
                    onValueChange={handleSelectChange}
                    defaultValue={paramsCategory}
                >
                    <SelectTrigger
                        id="select"
                        className="w-[180px] border-gray-300 drop-shadow-md"
                    >
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={`0`}>All</SelectItem>
                        {categories.map((category, i) => (
                            <SelectItem value={`${category.id}`} key={i}>
                                {category.category_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <SearchInput endpoint={"cashier"} />
            </div>
            {paramsSearch && <ParamsSearch endpoint={"cashier"} />}
        </div>
    );
};

export default CashIerFilter;
