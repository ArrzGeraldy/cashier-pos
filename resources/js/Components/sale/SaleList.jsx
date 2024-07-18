import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { cn, toRupiah } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import SaleDetailDialog from "./SaleDetailDialog";
import { useRef, useState } from "react";
import SaleForm from "./SaleForm";
import AlertDelete from "../shared/AlertDelete";
import { EllipsisVertical, Eye, PencilLine, Trash2 } from "lucide-react";

const styleSaleStatus = (status) => {
    if (status == "PAID") {
        return "text-green-500";
    } else if (status == "UNPAID") {
        return "text-yellow-500";
    } else if (status == "CANCEL") {
        return "text-rose-500";
    } else if (status == "EXPIRED") {
        return "text-red-500";
    }
};

const SaleList = ({ sales }) => {
    const saleDetailRef = useRef();
    const formSaleRef = useRef();
    const [dialogSale, setDialogSale] = useState(null);
    const [currSale, setCurrSale] = useState(null);
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleDialog = (createdAt, saleDetails) => {
        setDialogSale({
            createdAt,
            saleDetails,
        });
        saleDetailRef.current.click();
    };

    const handleIsOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleDeleteClick = (id) => {
        setData({
            name: id,
            id,
        });
        handleIsOpen();
    };

    const handleFormSale = (id, status) => {
        setCurrSale({
            id,
            status,
        });
        formSaleRef.current.click();
    };

    return (
        <>
            <SaleDetailDialog
                ref={saleDetailRef}
                dialogSale={dialogSale}
                setDialogSale={setDialogSale}
            />
            <AlertDelete
                data={data}
                endPoint={`sale`}
                handleIsOpen={handleIsOpen}
                isOpen={isOpen}
                setData={setData}
            />

            <SaleForm
                ref={formSaleRef}
                currSale={currSale}
                setCurrSale={setCurrSale}
            />
            <Table className="bg-white mt-4 rounded-md shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] font-semibold text-black">
                            No
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Id
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Customer
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Price
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Payment
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Changes
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Type
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            Status
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                            More
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sales.map((sale, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{sale.id}</TableCell>
                            <TableCell>{sale.customer_name}</TableCell>
                            <TableCell>{toRupiah(sale.total_price)}</TableCell>
                            <TableCell>
                                {toRupiah(sale.total_payment)}
                            </TableCell>
                            <TableCell>
                                {toRupiah(sale.money_changes)}
                            </TableCell>
                            <TableCell>{sale.payment_type}</TableCell>
                            <TableCell
                                className={cn(
                                    "font-semibold",
                                    styleSaleStatus(sale.status)
                                )}
                            >
                                {sale.status}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <EllipsisVertical
                                            className="text-slate-700"
                                            size={18}
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDialog(
                                                    sale.created_at,
                                                    sale.sale_details
                                                )
                                            }
                                            className="text-black flex items-center gap-2"
                                        >
                                            <Eye size={16} />
                                            <span>Detail</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFormSale(
                                                    sale.id,
                                                    sale.status
                                                )
                                            }
                                            className="flex gap-2 items-center text-black"
                                        >
                                            <PencilLine
                                                size={16}
                                                className="text-slate-700"
                                            />
                                            <span>Update</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeleteClick(sale.id)
                                            }
                                            className="flex gap-2 items-center text-black"
                                        >
                                            <Trash2
                                                size={16}
                                                className="text-slate-700"
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

export default SaleList;
