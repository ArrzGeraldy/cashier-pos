import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { formatDate } from "@/lib/utils";
import AlertDelete from "../shared/AlertDelete";
import { Link } from "@inertiajs/react";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";

const CategoryList = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        name: "",
        id: null,
    });

    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleClickDelete = (category) => {
        setData({
            name: category.category_name,
            id: category.id,
        });
        handleIsOpen();
    };

    return (
        <div>
            <AlertDelete
                data={data}
                endPoint={"category"}
                handleIsOpen={handleIsOpen}
                isOpen={isOpen}
            />

            <Table className="bg-white mt-4 rounded-md shadow-md border">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] font-semibold text-black">
                            No
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Category
                        </TableHead>
                        <TableHead className="font-semibold text-black  w-[400px]">
                            Created at
                        </TableHead>
                        <TableHead className="font-semibold text-black text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {i + 1}
                            </TableCell>
                            <TableCell>{category.category_name}</TableCell>
                            <TableCell>
                                {formatDate(category.created_at)}
                            </TableCell>
                            <TableCell className="flex justify-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <EllipsisVertical
                                            className="text-slate-700"
                                            size={18}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                className="flex gap-2 items-center text-black"
                                                href={`/category/edit/${category.id}`}
                                            >
                                                <PencilLine
                                                    className="text-slate-700"
                                                    size={18}
                                                />
                                                <span>Edit</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleClickDelete(category)
                                            }
                                            className="flex gap-2 items-center text-black"
                                        >
                                            <Trash2
                                                className="text-slate-700"
                                                size={18}
                                            />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoryList;
