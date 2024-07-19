import { Link, usePage } from "@inertiajs/react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import {
    BadgePercent,
    FileCode2,
    FolderInput,
    LaptopMinimal,
    Layers,
    LayoutGrid,
    LineChart,
    Users,
    Wallet,
} from "lucide-react";

const menuLists = [
    {
        name: "Dashboard",
        href: "/",
        component: "dashboard/index",
        access: ["admin", "super admin"],
    },
    {
        name: "Cashier",
        href: "/cashier",
        component: "cashier/index",
        access: ["admin", "super admin"],
    },
    {
        name: "Product",
        href: "/product",
        component: "product/index",
        access: ["admin", "super admin"],
    },
    {
        name: "Category",
        href: "/category",
        component: "category/index",
        access: ["admin", "super admin"],
    },
    {
        name: "Discount",
        href: "/discount",
        component: "discount/index",
        access: ["super admin"],
    },
    {
        name: "Expense",
        href: "/expense",
        component: "expense/index",
        access: ["super admin"],
    },
    {
        name: "Sale",
        href: "/sale",
        component: "sale/index",
        access: ["admin", "super admin"],
    },
    {
        name: "Report",
        href: "/report",
        component: "report/index",
        access: ["super admin"],
    },
    {
        name: "Account",
        href: "/account",
        component: "account/index",
        access: ["super admin"],
    },
];

const MenuList = ({ user }) => {
    const { component } = usePage();
    const renderIcon = (name) => {
        if (name === "Dashboard") return <LayoutGrid size={22} />;
        if (name === "Product") return <FolderInput size={22} />;
        if (name === "Category") return <Layers size={22} />;
        if (name === "Discount") return <BadgePercent size={22} />;
        if (name === "Cashier") return <LaptopMinimal size={22} />;
        if (name === "Sale") return <FileCode2 size={22} />;
        if (name === "Expense") return <Wallet size={22} />;
        if (name === "Report") return <LineChart size={22} />;
        if (name === "Account") return <Users size={22} />;
    };
    return (
        <ul className="mt-2 flex flex-col  gap-2.5">
            {menuLists
                .filter((list) => list.access.includes(user.role.toLowerCase()))
                .map((list, i) => (
                    <li
                        className={`rounded-lg ${
                            component === list.component
                                ? "bg-black text-white"
                                : "hover:bg-gray-200 transition-all"
                        }`}
                        key={i}
                    >
                        <Link
                            href={list.href}
                            className="flex gap-2 px-4 py-2 items-center"
                        >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {renderIcon(list.name)}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{list.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <span className="font-semibold">{list.name}</span>
                        </Link>
                    </li>
                ))}
        </ul>
    );
};

export default MenuList;
