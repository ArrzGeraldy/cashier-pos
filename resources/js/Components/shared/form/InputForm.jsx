import { Input } from "@/Components/ui/input";
import React from "react";

const InputForm = ({
    labelName,
    name,
    value,
    handleChange,
    isDisable = false,
    type = "text",
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{labelName}</label>
            <Input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={isDisable}
            />
        </div>
    );
};

export default InputForm;
