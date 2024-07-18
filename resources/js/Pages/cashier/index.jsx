import PosLayout from "@/Layouts/PosLayout";
import CashIerFilter from "@/Components/cashier/CashIerFilter";
import { useEffect, useRef, useState } from "react";
import CartItems from "@/Components/cashier/CartItems";
import { notifyError, notifyInfo } from "@/lib/toast";
import { ShoppingBag } from "lucide-react";
import CashierItems from "@/Components/cashier/CashierItems";
import ProductDialog from "@/Components/cashier/ProductDialog";

const index = (props) => {
    const { errors, products, categories, flash } = props;
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );

    const [dataDialogProduct, setDataDialogProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const dialogRef = useRef();

    const showDialog = (product) => {
        setDataDialogProduct(product);
        dialogRef.current.click();
    };

    useEffect(() => {
        if (flash.message) {
            if (flash.message.type === "info") {
                notifyInfo(flash.message.msg);
            } else if (flash.message.error) {
                notifyError(flash.message.error);
            }
        }
    }, [flash.message]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = () => {
        if (!dataDialogProduct || Number(quantity) <= 0) return;

        if (dataDialogProduct.stock < Number(quantity)) {
            notifyError("The quantity requested exceeds the available stock.");
            return;
        }

        const existingItemIndex = cartItems.findIndex(
            (item) => item.id === dataDialogProduct.id
        );
        const updatedCartItems = [...cartItems];

        if (existingItemIndex >= 0) {
            updatedCartItems[existingItemIndex].quantity += Number(quantity);
        } else {
            updatedCartItems.push({
                ...dataDialogProduct,
                quantity: quantity,
            });
        }

        setCartItems(updatedCartItems);
        setDataDialogProduct(null);
        setQuantity(1);
    };

    const handleShowCart = () => {
        const cart = document.querySelector(".cart");
        cart.classList.toggle("hidden");
    };

    useEffect(() => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("sidebar-minimize");
    }, []);

    return (
        <PosLayout title={props.title}>
            <div className="flex gap-8 relative">
                <ProductDialog
                    dialogRef={dialogRef}
                    product={dataDialogProduct}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                />

                <div className="w-full">
                    <CashIerFilter categories={categories} />
                    <CashierItems products={products} showDialog={showDialog} />
                </div>

                <div className="lg:w-[40%] w-[100%] cart fixed lg:relative hidden lg:block">
                    <CartItems
                        errors={errors}
                        products={products}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                    />
                </div>

                <button
                    onClick={handleShowCart}
                    className="fixed lg:hidden bottom-4 p-4 bg-black text-white rounded-full right-4 shadow-md"
                >
                    <ShoppingBag size={24} />
                </button>
            </div>
        </PosLayout>
    );
};

export default index;
