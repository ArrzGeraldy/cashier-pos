import PosLayout from "@/Layouts/PosLayout";
import ProductFrom from "@/Components/product/ProductFrom";
import Bread from "@/Components/shared/Bread";
const product = {
    name: "",
    price: 0,
    cost: 0,
    stock: "",
    category_id: "",
    description: "",
};
const Add = (props) => {
    return (
        <PosLayout title={props.title}>
            <Bread breadHref={"/product"} breadItem={"Product"} page={"Add"} />
            <ProductFrom
                product={product}
                categories={props.categories}
                endPoint={"/product"}
            />
        </PosLayout>
    );
};

export default Add;
