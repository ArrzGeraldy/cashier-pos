import DiscountForm from "@/Components/discount/DiscountForm";
import ProductDetail from "@/Components/discount/ProductDetail";
import SearchProduct from "@/Components/discount/SearchProduct";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";
import { useState } from "react";

const discountData = {
    name: "",
    minimum_unit: 1,
    value: 0,
    percentage: 0,
};

const Add = (props) => {
    const [product, setProduct] = useState(null);
    const { auth } = props;

    return (
        <PosLayout user={auth.user} title={props.title}>
            <SearchProduct setProduct={setProduct} />
            <Bread
                className="mt-4"
                breadHref={"/discount"}
                breadItem={"Discount"}
                page={"Create"}
            />
            {product && <ProductDetail product={product} />}
            {product && (
                <div>
                    <DiscountForm
                        endPoint={"/discount"}
                        product={product}
                        discount={discountData}
                    />
                </div>
            )}
        </PosLayout>
    );
};

export default Add;
