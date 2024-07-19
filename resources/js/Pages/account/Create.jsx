import AccountForm from "@/Components/account/AccountForm";
import Bread from "@/Components/shared/Bread";
import PosLayout from "@/Layouts/PosLayout";
import React from "react";

const Create = (props) => {
    const { auth } = props;

    return (
        <PosLayout user={auth.user} title={props.title}>
            <Bread
                breadHref={`/account`}
                breadItem={"Account"}
                page={"Create"}
            />
            <AccountForm />
        </PosLayout>
    );
};

export default Create;
