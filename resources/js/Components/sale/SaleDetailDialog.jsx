import React, { forwardRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { formatDate } from "@/lib/utils";
import ItemsSaleList from "../shared/sale/ItemsSaleList";

const SaleDetailDialog = forwardRef(({ dialogSale, setDialogSale }, ref) => {
    return (
        <Dialog>
            <DialogTrigger ref={ref} className="hidden">
                Open
            </DialogTrigger>
            <DialogClose onClick={() => setDialogSale(null)} asChild>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail Sale</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <div className="text-sm">
                            <p>Created: {formatDate(dialogSale?.createdAt)}</p>

                            <h4 className="font-medium mt-2 mb-1">Items</h4>
                            <ItemsSaleList
                                saleItems={dialogSale?.saleDetails}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </DialogClose>
        </Dialog>
    );
});

export default SaleDetailDialog;
