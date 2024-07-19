import AccountList from "@/Components/account/AccountList";
import SearchInput from "@/Components/shared/SearchInput";
import PosLayout from "@/Layouts/PosLayout";
import { notifySuccess } from "@/lib/toast";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

const index = (props) => {
    const { auth, flash } = props;

    useEffect(() => {
        if (flash.message) {
            notifySuccess(flash.message);
        }
    }, [flash]);

    return (
        <PosLayout user={auth.user} title={props.title}>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center gap-4 lg:justify-between">
                <Link
                    href="/account/create"
                    className="px-4 py-2 rounded-md bg-black font-semibold text-white  block w-fit"
                >
                    Create Account
                </Link>
                <SearchInput endpoint={"expense"} />
            </div>
            <AccountList users={props.users} />
        </PosLayout>
    );
};

export default index;
