import { toRupiah } from "@/lib/utils";
import React from "react";

const ProductDetail = ({ product }) => {
    return (
        <div className="mt-4 w-1/2 px-4 py-3 rounded-md shadow-md bg-white">
            <div className="flex gap-2 items-center">
                <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="w-1/4 bg-slate-200 rounded-md h-28 object-contain"
                />
                <div>
                    <p className="text-lg font-medium ">
                        {product.name} | {product.category.category_name}
                    </p>
                    <div className="text-sm">
                        <p>{toRupiah(product.cost)} (Cost)</p>
                        <p>{toRupiah(product.price)} (Price)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
