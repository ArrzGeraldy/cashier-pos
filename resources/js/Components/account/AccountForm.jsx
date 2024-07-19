import React from "react";
import InputForm from "../shared/form/InputForm";
import { useForm } from "@inertiajs/react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import ErrorText from "../shared/ErrorText";
import ButtonsForm from "../shared/form/ButtonsForm";

const AccountForm = () => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "admin",
    });

    const handleSelectChange = (e) => {
        setData("role", e);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <form
            onSubmit={submit}
            className="mt-4 grid lg:grid-cols-2 gap-4 bg-white rounded-md p-4 shadow-md"
        >
            <div>
                <InputForm
                    handleChange={handleChange}
                    labelName={"Name"}
                    name={"name"}
                    value={data.name}
                />
                {errors.name && <ErrorText message={errors.name} />}
            </div>

            <div>
                <InputForm
                    handleChange={handleChange}
                    labelName={"Email"}
                    name={"email"}
                    value={data.email}
                    type="email"
                />
                {errors.email && <ErrorText message={errors.email} />}
            </div>

            <div>
                <InputForm
                    handleChange={handleChange}
                    labelName={"Password"}
                    name={"password"}
                    value={data.password}
                    type="password"
                />
                {errors.password && <ErrorText message={errors.password} />}
            </div>
            <div>
                <InputForm
                    handleChange={handleChange}
                    labelName={"Confirm Password"}
                    name={"password_confirmation"}
                    value={data.password_confirmation}
                    type="password"
                />
                {errors.password_confirmation && (
                    <ErrorText message={errors.password_confirmation} />
                )}
            </div>

            <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Role</label>
                    <Select onValueChange={(e) => handleSelectChange(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="super admin">
                                Super Admin
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.role && <ErrorText message={errors.role} />}
                </div>
            </div>

            <ButtonsForm cancelTo={"/account"} />
        </form>
    );
};

export default AccountForm;
