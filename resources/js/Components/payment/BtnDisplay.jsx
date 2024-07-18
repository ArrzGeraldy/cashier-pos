import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const buttons = [{ name: "Detail" }, { name: "Cash" }, { name: "Qris" }];

const BtnDisplay = ({ display, setDisplay }) => {
    const handleChangeDisplay = (data) => {
        if (data == display) return;

        if (data == "Cash") {
            toast.remove();
        }

        setDisplay(data);
    };

    return (
        <div className="flex bg-slate-200">
            {buttons.map((btn) => (
                <button
                    key={btn.name}
                    onClick={() => handleChangeDisplay(btn.name)}
                    className={cn(
                        "font-semibold w-full py-3",
                        display == btn.name
                            ? "bg-black text-white"
                            : "hover:bg-slate-300 transition-all"
                    )}
                >
                    {btn.name}
                </button>
            ))}
        </div>
    );
};

export default BtnDisplay;
