import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { router } from "@inertiajs/react";

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
import { useRef, useState } from "react";

const AccountList = ({ users }) => {
    const [data, setData] = useState({
        id: null,
        name: "",
    });
    const triggerRef = useRef();

    const handleOpen = (name, id) => {
        setData({
            id,
            name,
        });

        triggerRef.current.click();
    };

    const handleCancel = () => {
        setData({
            id: null,
            name: "",
        });
    };

    const handleDelete = () => {
        router.delete(`/account/${data.id}`);
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="hidden" ref={triggerRef}>
                    Open
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete <strong>{data.name}</strong> account
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Table className="bg-white mt-4 rounded-md shadow-md border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] font-medium text-black">
                            No
                        </TableHead>
                        <TableHead className="font-medium text-black">
                            Name
                        </TableHead>
                        <TableHead className="font-medium text-black">
                            Email
                        </TableHead>
                        <TableHead className="font-medium text-black">
                            Role
                        </TableHead>
                        <TableHead className="font-medium text-black">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, i) => (
                        <TableRow>
                            <TableCell className="font-medium">
                                {i + 1}
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical
                                            className="text-slate-800"
                                            size={18}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleOpen(user.name, user.id)
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

export default AccountList;
