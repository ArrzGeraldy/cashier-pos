import ProductFrom from "@/Components/product/ProductFrom";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";

const Edit = (props) => {
    const { auth } = props;
    return (
        <PosLayout user={auth.user} title={props.title}>
            <Bread breadHref={"/product"} breadItem={"Product"} page={"Add"} />

            <ProductFrom
                categories={props.categories}
                product={props.product}
                endPoint={`/product/update/${props.product.id}`}
            />
        </PosLayout>
    );
};

export default Edit;
