import { toRupiah } from "@/lib/utils";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import { notifyError } from "@/lib/toast";
import { useState } from "react";
import ErrorText from "../shared/ErrorText";
import { Minus, Plus, X } from "lucide-react";

const CartItems = ({ cartItems, setCartItems, products, errors }) => {
    const [customerName, setCustomerName] = useState("");
    const handleQuantity = (method, id) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.map((item) => {
                if (item.id === id) {
                    const product = products.find((p) => p.id === id);
                    if (method === "+") {
                        if (item.quantity < product.stock) {
                            return { ...item, quantity: item.quantity + 1 };
                        } else {
                            notifyError(`Not enough stock for ${item.name}`);
                        }
                    } else if (method === "-" && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            });
        });
    };

    const handleDeleteItem = (id) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => item.id !== id);
        });
    };

    const handleOrder = () => {
        router.post("/sale", { items: cartItems, customerName });
    };
    return (
        <div
            className="shadow-md mt-4 sticky top-4 bg-white rounded-md "
            style={{ height: "calc(100vh - 120px)" }}
        >
            <h4 className="mt-2 py-2 text-xl font-medium text-center">Items</h4>
            <div className="max-h-[78%] item-cart-container overflow-y-auto px-4">
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="customer">Customer Name</label>
                    <input
                        className="py-1.5 px-2 rounded-md border border-slate-700"
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {errors.customerName && (
                        <ErrorText message={errors.customerName} />
                    )}
                </div>
                {cartItems &&
                    cartItems.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 relative h-24 px-2 mx-auto py-2 rounded-md mt-3 flex items-center justify-between"
                        >
                            <div className="flex gap-1 items-center">
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.name}
                                    className="w-14 h-14 object-contain"
                                />
                                <div className="">
                                    <p className="text-xs font-semibold">
                                        {item.name}
                                    </p>
                                    <div className="flex gap-2 items-center mt-1">
                                        <button
                                            onClick={() =>
                                                handleQuantity("-", item.id)
                                            }
                                            className=" text-black font-semibold flex px-1 py-1 items-center justify-center rounded-full "
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <p className="text-xs">
                                            {item.quantity}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleQuantity("+", item.id)
                                            }
                                            className=" text-black font-semibold flex px-1 py-1 items-center justify-center rounded-full "
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs">
                                {toRupiah(item.price * item.quantity)}
                            </p>

                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="absolute top-2 right-2  "
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
            </div>
            {cartItems.length > 0 && (
                <div className="w-[85%] mx-auto block mt-4">
                    <Button onClick={handleOrder} className="w-full bg-black">
                        Make Order
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartItems;
