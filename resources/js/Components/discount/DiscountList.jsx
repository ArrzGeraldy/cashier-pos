import React, { useRef, useState } from "react";
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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { toRupiah } from "@/lib/utils";

const DiscountList = ({ discounts }) => {
    const [discountDetail, setDiscountDetail] = useState({
        name: "",
        id: null,
    });
    const dialogRef = useRef();
    const handleClickDelete = (name, id) => {
        setDiscountDetail({
            name,
            id,
        });

        dialogRef.current.click();
    };

    const onDelete = () => {
        if (!discountDetail.id) return;
        router.delete(`/discount/delete/${discountDetail.id}`);
        setDiscountDetail({
            name: "",
            id: null,
        });
    };
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger ref={dialogRef} hidden>
                    Open
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete <strong>{discountDetail.name}</strong> and
                            remove from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() =>
                                setDiscountDetail({ name: "", id: null })
                            }
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={onDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Table className="bg-white mt-4 rounded-md shadow-md border">
                <TableCaption>A list of your discount.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] font-semibold text-black">
                            No
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Name
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Product
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Percentage
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            MinUnit
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Value
                        </TableHead>
                        <TableHead className="font-semibold text-black text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {discounts.map((discount, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {i + 1}
                            </TableCell>
                            <TableCell>{discount.name}</TableCell>
                            <TableCell>{discount.product.name}</TableCell>
                            <TableCell>{discount.percentage} %</TableCell>
                            <TableCell>{discount.minimum_unit}</TableCell>
                            <TableCell>{toRupiah(discount.value)}</TableCell>

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
                                                href={`/discount/edit/${discount.id}`}
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
                                                handleClickDelete(
                                                    discount.name,
                                                    discount.id
                                                )
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

export default DiscountList;
