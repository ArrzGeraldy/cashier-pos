import React from "react";
import { Button } from "../ui/button";
import { Package, ShoppingBag } from "lucide-react";
import { toRupiah } from "@/lib/utils";

const Card = ({ product, showDialog }) => {
    return (
        <div className="bg-white px-4 py-4 border text-sm border-gray-300 rounded-md shadow-md">
            <img
                src={`/storage/${product.image}`}
                alt={product.name}
                className="w-full h-44 object-contain"
            />
            <div className="flex flex-col mt-4">
                <span className="text-xs text-gray-500 ">
                    {product.category.category_name}
                </span>
                <h4 className="font-semibold text-base">{product.name}</h4>
            </div>
            <div className="flex justify-between mt-2 items-center">
                <p className="font-semibold">{toRupiah(product.price)}</p>
                <div className="flex items-center gap-1">
                    <Package className="text-gray-700" size={16} />
                    <span>{product.stock}</span>
                </div>
            </div>
            <Button
                disabled={product.stock <= 0}
                className="w-full mt-4 bg-black flex items-center gap-2"
                onClick={() => showDialog(product)}
            >
                <ShoppingBag size={20} />
                <span>Add</span>
            </Button>
        </div>
    );
};

export default Card;
