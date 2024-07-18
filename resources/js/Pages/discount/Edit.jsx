import DiscountForm from "@/Components/discount/DiscountForm";
import ProductDetail from "@/Components/discount/ProductDetail";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";
import React from "react";

const Edit = (props) => {
    const { discount, product } = props;
    return (
        <PosLayout title={props.title}>
            <Bread
                breadHref={"/discount"}
                breadItem={"discount"}
                page={"Edit"}
            />
            <ProductDetail product={product} />
            <DiscountForm
                method="PUT"
                endPoint={`/discount/update/${discount.id}`}
                product={product}
                discount={discount}
            />
        </PosLayout>
    );
};

export default Edit;
