
import { NavHome } from "./NavHome";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <NavHome />
            <Outlet />
        </>
    );
};
