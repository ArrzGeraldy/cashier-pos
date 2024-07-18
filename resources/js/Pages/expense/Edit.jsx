import ExpenseForm from "@/Components/expense/ExpenseForm";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";
import React from "react";

const Edit = (props) => {
    const { expense } = props;
    return (
        <PosLayout title={props.title}>
            <Bread breadHref={"/expense"} breadItem={"Expense"} page={"Edit"} />

            <ExpenseForm
                expenseData={expense}
                endPoint={`/expense/${expense.id}`}
            />
        </PosLayout>
    );
};

export default Edit;
