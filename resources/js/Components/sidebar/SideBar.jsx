import React from "react";

import MenuList from "../shared/sidebar/MenuList";

const SideBar = () => {
    return (
        <aside
            className="hidden bg-white sidebar md:flex flex-col rounded-lg px-4 py-4 shadow-md"
            style={{ height: "calc(100vh - 90px)" }}
        >
            <MenuList />
        </aside>
    );
};

export default SideBar;
