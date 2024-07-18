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

import AlertDelete from "../shared/AlertDelete";
import { Link } from "@inertiajs/react";
import { toRupiah } from "@/lib/utils";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
const ProductlList = ({ products }) => {
    const [data, setData] = useState({
        name: "",
        id: null,
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleBtnDelete = (product) => {
        setData({
            name: product.name,
            id: product.id,
        });
        handleIsOpen();
    };
    return (
        <>
            <AlertDelete
                isOpen={isOpen}
                data={data}
                setData={setData}
                handleIsOpen={handleIsOpen}
                endPoint={"product"}
            />
            <Table className="bg-white mt-4 rounded-md shadow-md border">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead className="font-semibold text-black w-1/4">
                            Product
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Category
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Cost
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Price
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Stock
                        </TableHead>
                        <TableHead className="text-center font-semibold text-black">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {i + 1}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                                {product.category.category_name}
                            </TableCell>
                            <TableCell>{toRupiah(product.cost)}</TableCell>
                            <TableCell>{toRupiah(product.price)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell className="flex justify-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <EllipsisVertical
                                            className="text-slate-800"
                                            size={18}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                href={`/product/edit/${product.id}`}
                                                className="flex gap-2 items-center w-full text-black"
                                            >
                                                <PencilLine
                                                    className="text-slate-700"
                                                    size={16}
                                                />
                                                <span>Edit</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleBtnDelete(product)
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
        </>
    );
};

export default ProductlList;
