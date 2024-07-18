import React, { useEffect, useState } from "react";

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
import { Input } from "@/Components/ui/input";
import { Button } from "../ui/button";
import CardDiscount from "./CardDiscount";
import { toRupiah } from "@/lib/utils";

const ProductDialog = ({
    dialogRef,
    product,
    quantity,
    setQuantity,
    handleAddToCart,
}) => {
    const [discountPrice, setDiscountPrice] = useState(0);

    const handleCancel = () => {
        setQuantity(1);
        setDiscountPrice(0);
    };

    useEffect(() => {
        let discountValue = 0;
        let minimumUnit = 0;
        product?.discounts?.forEach((discount) => {
            if (quantity >= discount.minimum_unit) {
                if (minimumUnit < discount.minimum_unit) {
                    minimumUnit = discount.minimum_unit;
                    discountValue = discount.value;
                }
            }
        });

        if (discountValue > 0) {
            setDiscountPrice(product.price - discountValue);
        } else {
            setDiscountPrice(0);
        }
    }, [quantity]);

    return (
        <AlertDialog>
            <AlertDialogTrigger ref={dialogRef} hidden>
                Open
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{product?.name}</AlertDialogTitle>
                    <AlertDialogDescription hidden></AlertDialogDescription>
                    <div className="flex items-center gap-2">
                        <p
                            className={
                                discountPrice > 0
                                    ? "text-slate-700 line-through"
                                    : ""
                            }
                        >
                            {toRupiah(product?.price)}
                        </p>
                        {discountPrice > 0 && (
                            <p className="font-medium">
                                {toRupiah(discountPrice)}
                            </p>
                        )}
                    </div>
                </AlertDialogHeader>
                <div className="flex flex-col gap-1 text-sm">
                    <label htmlFor="quantity">Quantity</label>
                    <Input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                    />
                    <div className="flex gap-4 mt-4">
                        {[5, 10, 20].map((amount) => (
                            <Button
                                key={amount}
                                onClick={() =>
                                    setQuantity((prev) => Number(prev) + amount)
                                }
                                size="sm"
                                variant="secondary"
                            >
                                + {amount}
                            </Button>
                        ))}
                    </div>
                </div>
                {product?.discounts?.map((discount, i) => (
                    <CardDiscount key={i} discount={discount} />
                ))}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddToCart}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ProductDialog;
