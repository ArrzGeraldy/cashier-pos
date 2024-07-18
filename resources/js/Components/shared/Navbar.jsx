import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import MenuList from "./sidebar/MenuList";
import { AlignJustify, CircleUserRound } from "lucide-react";
import Dropdown from "@/Components/Dropdown";

const Navbar = () => {
    const handleSizeSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("sidebar-minimize");
    };
    return (
        <nav className="w-full h-14 mx-auto px-4 flex items-center justify-between bg-white rounded-lg">
            <button
                aria-label="menu"
                className="hidden md:block"
                onClick={handleSizeSidebar}
            >
                <AlignJustify size={32} />
            </button>

            <div className="md:hidden block">
                <Sheet>
                    <SheetTrigger>
                        <AlignJustify className="mt-1" size={32} />
                    </SheetTrigger>
                    <SheetContent side={`left`}>
                        <SheetHeader>
                            <SheetTitle className="border-b border-slate-500 py-1">
                                Menu
                            </SheetTitle>
                            <MenuList />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <h4 className="text-xl font-semibold">Rin</h4>

            <div className="flex gap-2 items-center">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                <CircleUserRound size={28} />
                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
