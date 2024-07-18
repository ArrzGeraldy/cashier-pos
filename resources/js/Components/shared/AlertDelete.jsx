import React from "react";

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
import { router } from "@inertiajs/react";

const AlertDelete = ({ data, isOpen, handleIsOpen, endPoint, setData }) => {
    const onDelete = () => {
        router.delete(`/${endPoint}/${data?.id}`);
        localStorage.setItem("cartItems", JSON.stringify([]));
        handleIsOpen();
        setData({
            name: "",
            id: null,
        });
    };
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger className="hidden">Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete <strong>{data?.name}</strong> and remove from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleIsOpen}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDelete;
