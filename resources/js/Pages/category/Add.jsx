import Bread from "@/Components/shared/Bread";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import PosLayout from "@/Layouts/PosLayout";
import { notifyError } from "@/lib/toast";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Add = (props) => {
    const { post, data, setData, reset } = useForm({
        category_name: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/category", {
            onSuccess: () => reset(),
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
                page={"Add"}
            />
            <form
                onSubmit={handleSubmit}
                className="mt-4 w-full lg:w-1/2 bg-white py-4 px-4 rounded-md shadow-md"
            >
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="" className="font-medium">
                        Name
                    </label>
                    <Input
                        value={data.category_name}
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

export default Add;
