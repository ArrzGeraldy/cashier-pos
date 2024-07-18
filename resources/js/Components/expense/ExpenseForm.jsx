import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toRupiah } from "@/lib/utils";
import ErrorText from "../shared/ErrorText";

const ExpenseForm = ({ expenseData, endPoint }) => {
    const { data, setData, post, errors } = useForm({
        expense_category: expenseData.expense_category,
        amount: expenseData.amount,
        description: expenseData.description,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleRupiah = (e) => {
        const { name } = e.target;
        const value = e.target.value.replace(/[^0-9]/g, "");
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(endPoint, {
            onProgress: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="w-full rounded-md p-4 mt-4 shadow-md border border-slate-300 bg-white grid lg:grid-cols-2 gap-4"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="expense_category">Category Expense</label>
                <Input
                    value={data.expense_category}
                    onChange={handleChange}
                    name="expense_category"
                    id="expense_category"
                    placeholder="Category Expense"
                />
                {errors.expense_category && (
                    <ErrorText message={errors.expense_category} />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount">Amount</label>
                <Input
                    value={toRupiah(data.amount)}
                    onChange={handleRupiah}
                    name="amount"
                    id="amount"
                    placeholder="Rp.0"
                />
                {errors.amount && <ErrorText message={errors.amount} />}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                    value={data.description}
                    onChange={handleChange}
                    name="description"
                    id="description"
                    placeholder={"Optional"}
                ></Textarea>
                {errors.description && (
                    <ErrorText message={errors.description} />
                )}
            </div>

            <div className="flex lg:col-span-2 gap-4 justify-end">
                <Link
                    href="/expense"
                    className="bg-slate-200 font-semibold hover:bg-slate-300 transition-all px-4 py-2 rounded-md"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
