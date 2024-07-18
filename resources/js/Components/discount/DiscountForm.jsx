import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "@inertiajs/react";

import { toRupiah } from "@/lib/utils";
import DiscountPriceInformation from "../cashier/DiscountPriceInformation";
import ButtonsForm from "../shared/form/ButtonsForm";
import InputForm from "../shared/form/InputForm";
import { notifyError } from "@/lib/toast";
import ErrorText from "../shared/ErrorText";

const DiscountForm = ({ product, discount, endPoint, method = "POST" }) => {
    const { data, setData, post, put, errors } = useForm({
        name: discount.name,
        minimum_unit: discount.minimum_unit,
        value: discount.value,
        percentage: discount.percentage,
        product_id: product.id,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handlePercentage = (e) => {
        const { name, value } = e.target;
        const cleanedValue = value.replace(/[^0-9]/g, "");
        const valueWithPercentage = cleanedValue;
        setData(name, valueWithPercentage);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (method == "put" || method == "PUT") {
            put(endPoint, {
                onError: () => {
                    notifyError("There was an error updating the discount.");
                },
                onProgress: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        } else {
            post(endPoint, {
                onError: () => {
                    notifyError("There was an error creating the discount.");
                },
                onProgress: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        }
    };

    useEffect(() => {
        if (data.percentage) {
            const { price } = product;
            const calculate = price * (data.percentage / 100);
            setData("value", calculate);
        }
    }, [data.percentage]);

    return (
        <form
            onSubmit={submit}
            className="grid grid-cols-2  relative px-4 py-3 gap-4 rounded-md shadow-md bg-white mt-4"
        >
            <InputForm
                labelName={"Product ID"}
                handleChange={handleChange}
                isDisable={true}
                name={"product_id"}
                value={product.id}
            />

            <div>
                <InputForm
                    labelName={"Discount Name"}
                    handleChange={handleChange}
                    isDisable={false}
                    name={"name"}
                    value={data.name}
                />
                {errors.name && <ErrorText message={errors.name} />}
            </div>

            <div>
                <InputForm
                    labelName={"Percentage %"}
                    handleChange={handlePercentage}
                    isDisable={false}
                    name={"percentage"}
                    value={`% ${data.percentage}`}
                />
                {errors.percentage && <ErrorText message={errors.percentage} />}
            </div>

            <div>
                <InputForm
                    labelName={"Minimum Unit"}
                    handleChange={handleChange}
                    isDisable={false}
                    name={"minimum_unit"}
                    type={"number"}
                    value={data.minimum_unit}
                />
                {errors.minimum_unit && (
                    <ErrorText message={errors.minimum_unit} />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="discoutn">Discount</label>
                <Input value={`${toRupiah(data.value)}`} disabled />
            </div>

            <DiscountPriceInformation
                calculateDiscount={data.value}
                productPrice={product.price}
                unit={data.minimum_unit}
            />

            <ButtonsForm isLoading={isLoading} cancelTo={"/discount"} />
        </form>
    );
};

export default DiscountForm;
