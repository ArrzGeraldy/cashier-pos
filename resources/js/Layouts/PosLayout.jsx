import { Head } from "@inertiajs/react";
import SideBar from "@/Components/sidebar/SideBar";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/shared/Navbar";

export default function PosLayout({
    children,
    title,
    user = { role: "admin" },
}) {
    return (
        <div className="w-full min-h-screen bg-gray-200 py-4 flex flex-col">
            <Head title={title} />
            <div className="w-[95%] mx-auto">
                <Navbar />
                <main className="w-full flex mt-4 gap-8 ">
                    <Toaster />
                    <SideBar user={user} />
                    <section className="w-full">{children}</section>
                </main>
            </div>
        </div>
    );
}
