import React, { forwardRef, useState } from "react";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { router } from "@inertiajs/react";

const SaleForm = forwardRef(({ currSale, setCurrSale }, ref) => {
    const [updateValue, setUpdateValue] = useState("");
    const onUpdate = () => {
        if (updateValue == currSale?.status || updateValue.trim() == "") return;

        if (updateValue == "PAID") {
            router.get(`/payment/${currSale?.id}`);
        } else {
            router.patch(`/sale/update/status/${currSale?.id}`, {
                updateValue,
            });
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger hidden ref={ref}>
                Open
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Status Sale</AlertDialogTitle>
                    <AlertDialogDescription className="text-black font-semibold">
                        Sale ID: #{currSale?.id}
                    </AlertDialogDescription>
                    <Select
                        onValueChange={(e) => setUpdateValue(e)}
                        defaultValue={currSale?.status || ""}
                    >
                        <SelectTrigger className="w-full border border-gray-800">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PAID">PAID</SelectItem>
                            <SelectItem value="UNPAID">UNPAID</SelectItem>
                            <SelectItem value="CANCEL">CANCEL</SelectItem>
                        </SelectContent>
                    </Select>
                    {}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setCurrSale(null);
                            setUpdateValue("");
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onUpdate}>
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

export default SaleForm;
