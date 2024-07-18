import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Link, useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { cn, toRupiah } from "@/lib/utils";
import { notifyError } from "@/lib/toast";
import ErrorText from "../shared/ErrorText";
import { Image, PenLine } from "lucide-react";
import InputForm from "../shared/form/InputForm";
import ButtonsForm from "../shared/form/ButtonsForm";

const ProductFrom = ({ categories, product, endPoint }) => {
    const { data, setData, post, errors } = useForm({
        name: product.name,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        category_id: product.category_id,
        description: product.description || "",
        image: null,
    });
    const pathImage = product.image ? `/storage/${product.image}` : null;
    const [imagePreview, setImagePreview] = useState(pathImage);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setData(name, files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setData(name, value);
        }
    };

    const handleRupiahChange = (e) => {
        const { name } = e.target;
        const value = e.target.value.replace(/[^0-9]/g, "");
        setData(name, value);
    };

    const selectImage = () => {
        document.querySelector("#image-input").click();
    };

    const handleSelectChange = (value) => {
        setData("category_id", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(endPoint, {
            onError: () => {
                notifyError("There was an error creating the product.");
            },
            onProgress: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    useEffect(() => {
        if (errors.image) {
            setImagePreview(null);
        }
    }, [errors.image]);

    return (
        <form
            className="flex flex-col lg:grid lg:grid-cols-2 bg-white px-4 py-4 shadow-md rounded-md mt-4 gap-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 col-span-2">
                <div
                    className={cn(
                        "relative h-64 flex w-[90%] lg:w-3/4 mx-auto justify-center items-center bg-gray-100 rounded-md py-4",
                        errors.image && "border border-red-500"
                    )}
                >
                    {imagePreview ? (
                        <div>
                            <img
                                src={imagePreview}
                                alt="preview"
                                className="max-h-56"
                            />
                            <div
                                onClick={selectImage}
                                className="bg-slate-950 text-white w-fit px-2 py-1.5 rounded-md absolute top-2 right-2 cursor-pointer hover:bg-slate-800 transition-all"
                            >
                                <PenLine size={20} />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col text-slate-700 items-center rounded-md cursor-pointer"
                            onClick={selectImage}
                        >
                            <Image className="text-slate-600" size={64} />
                            <p className="font-medium">Import Image</p>
                            {errors.image && (
                                <ErrorText message={errors.image} />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <InputForm
                    labelName={"Name"}
                    name={"name"}
                    value={data.name}
                    handleChange={handleChange}
                />
                {errors.name && <ErrorText message={errors.name} />}
            </div>
            <div>
                <InputForm
                    labelName={"Stock"}
                    name={"stock"}
                    value={data.stock}
                    type="number"
                    handleChange={handleChange}
                />
                {errors.stock && <ErrorText message={errors.stock} />}
            </div>
            <div>
                <InputForm
                    labelName={"Cost"}
                    name={"cost"}
                    value={toRupiah(data.cost)}
                    handleChange={handleRupiahChange}
                />

                {errors.cost && <ErrorText message={errors.cost} />}
            </div>
            <div>
                <InputForm
                    labelName={"Price"}
                    name={"price"}
                    value={toRupiah(data.price)}
                    handleChange={handleRupiahChange}
                />

                {errors.price && <ErrorText message={errors.price} />}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="stock">Description</label>
                <Textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />
                {errors.description && (
                    <ErrorText message={errors.description} />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category">Category</label>
                <Select
                    defaultValue={`${product.category_id}`}
                    onValueChange={handleSelectChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category, i) => (
                            <SelectItem
                                value={`${category.id}`}
                                key={category.id}
                            >
                                {category.category_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && (
                    <ErrorText message={errors.category_id} />
                )}
            </div>

            <Input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                id="image-input"
            />
            <ButtonsForm cancelTo={"/product"} isLoading={isLoading} />
        </form>
    );
};

export default ProductFrom;
