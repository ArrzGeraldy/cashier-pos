import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { toRupiah } from "@/lib/utils";
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

import { EllipsisVertical, Eye, PenLine, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";

const ExpenseList = ({ expenses }) => {
    const dialogRef = useRef();
    const [dialogCtx, setDialogCtx] = useState("");
    const [desc, setDesc] = useState("");
    const [expenseData, setExpenseData] = useState({
        category: null,
        id: null,
    });

    const descDialog = (desc) => {
        setDialogCtx("desc");
        if (desc) {
            setDesc(desc);
        } else {
            setDesc("Description null");
        }
        dialogRef.current.click();
    };
    const deleteDialog = (category, id) => {
        setDialogCtx("delete");
        setExpenseData({
            category,
            id,
        });

        dialogRef.current.click();
    };

    const handleDelete = () => {
        if (!expenseData.id) return;

        router.delete(`/expense/${expenseData.id}`);
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
                            {dialogCtx == "delete"
                                ? "Are you absolutely sure?"
                                : "Description"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogCtx == "delete" && (
                                <span>
                                    this action cannot be undone. This will
                                    permanently delete{" "}
                                    <strong>{expenseData.category}</strong>
                                </span>
                            )}
                        </AlertDialogDescription>
                        {dialogCtx == "desc" && <p>{desc}</p>}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className={dialogCtx == "desc" && "hidden"}
                        >
                            Cancel
                        </AlertDialogCancel>
                        {dialogCtx == "desc" ? (
                            <AlertDialogAction>Close</AlertDialogAction>
                        ) : (
                            <AlertDialogAction onClick={handleDelete}>
                                Delete
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Table className="bg-white mt-4 rounded-md shadow-md border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-black">
                            No
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Category Expense
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Amount
                        </TableHead>
                        <TableHead className="font-semibold text-black text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{expense.expense_category}</TableCell>
                            <TableCell>{toRupiah(expense.amount)}</TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <EllipsisVertical
                                            className="text-slate-800"
                                            size={18}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                descDialog(expense.description)
                                            }
                                            className=" flex item-center gap-2"
                                        >
                                            <Eye
                                                className="text-slate-700"
                                                size={16}
                                            />{" "}
                                            <span>Detail</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                className=" flex item-center gap-2"
                                                href={`/expense/${expense.id}`}
                                            >
                                                <PenLine
                                                    className="text-slate-700"
                                                    size={16}
                                                />{" "}
                                                <span>Edit</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                deleteDialog(
                                                    expense.expense_category,
                                                    expense.id
                                                )
                                            }
                                            className=" flex item-center gap-2"
                                        >
                                            <Trash2
                                                className="text-slate-700"
                                                size={16}
                                            />{" "}
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

export default ExpenseList;
