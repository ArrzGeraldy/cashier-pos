import ExpenseForm from "@/Components/expense/ExpenseForm";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";
import React from "react";

const expenseData = {
    expense_category: "",
    amount: "",
    description: "",
};

const Add = (props) => {
    const { auth } = props;

    return (
        <PosLayout user={auth.user} title={props.title}>
            <Bread breadHref={"/expense"} breadItem={"Expense"} page={"Add"} />
            <ExpenseForm expenseData={expenseData} endPoint={"/expense"} />
        </PosLayout>
    );
};

export default Add;
