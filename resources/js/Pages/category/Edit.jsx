import Bread from "@/Components/shared/Bread";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import PosLayout from "@/Layouts/PosLayout";
import { notifyError } from "@/lib/toast";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Edit = (props) => {
    const { category } = props;
    const { patch, data, setData } = useForm({
        category_name: category.category_name,
    });

    const { auth } = props;

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        patch(`/category/update/${category.id}`, {
            onProgress: setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    useEffect(() => {
        if (props.errors.category_name) {
            notifyError(props.errors.category_name);
        }
    }, [props.errors.category_name]);

    return (
        <PosLayout user={auth.user} title={props.title}>
            <Bread
                breadHref={"/category"}
                breadItem={"Category"}
                page={"Edit"}
            />
            <form
                onSubmit={onSubmit}
                className="mt-4 lg:w-1/2 w-full bg-white py-4 px-4 rounded-md shadow-md"
            >
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="" className="font-medium">
                        Name
                    </label>
                    <Input
                        defaultValue={data.category_name}
                        onChange={(e) =>
                            setData("category_name", e.target.value)
                        }
                        placeholder="Category Name"
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <Link
                        href="/category"
                        className=" bg-slate-200 font-semibold px-3 py-2 rounded-md"
                    >
                        Cancel
                    </Link>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="bg-black"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </PosLayout>
    );
};

export default Edit;
