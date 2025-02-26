import { useState, useEffect, useRef, RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store";
import { setActiveIndex } from "../../Store/NavSlice";
import { useClickOutside } from "../Hooks/HandleOutsideClick";
import { NavItem } from "../Types/Nav";

const NavItems: NavItem[] = [
    {
        name: "Chat",
        icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
        to: "/chat"
    },
    {
        name: "Agents",
        icon: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        to: "/agents"
    },
    {
        name: "File Manager",
        icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
        to: "/test"
    }

];
export const NavHome = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const activeIndex = useSelector((state: RootState) => state.nav.activeIndex);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navDropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef as RefObject<HTMLElement>, () => setIsOpen(false));
    useClickOutside(navDropdownRef as RefObject<HTMLElement>, () => setIsOpenNav(false));


    useEffect(() => {
        const currentIndex = NavItems.findIndex(item => item.to === location.pathname);
        dispatch(setActiveIndex(currentIndex !== -1 ? currentIndex : null));
    }, [location.pathname, dispatch]);



    return (
        <nav className="flex items-center justify-between px-6 py-2 bg-white text-primary shadow-md font-bold sticky top-0 z-10 h-16">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-4 cursor-pointer">
                <div className="logo">
                    <img src="img/logo.png" alt="logo ueh" className="w-15 h-9" />
                </div>
                <div className="name hidden md:block">UEH Chatbot</div>
            </div>

            {/* Dropdown responsiveeeeee */}
            <div className="md:hidden relative">
                <div
                    className="flex items-center space-x-2 justify-center cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenNav(!isOpenNav);
                    }}
                >
                    <p>Chat</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

                {/* Menu responsive */}
                {isOpenNav && (
                    <div
                        ref={navDropdownRef}
                        className="absolute left-1/2 top-12 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border font-medium cursor-auto w-48"
                        onClick={(e) => e.stopPropagation()} // Thêm dòng này
                    >
                        {NavItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                onClick={() => setIsOpenNav(false)}
                                className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f26f33] hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden md:flex items-center space-x-4 gap-2">
                {NavItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className={`flex items-center space-x-2 p-3 rounded transition duration-300 
                        ${activeIndex === index ? "bg-primary text-white pointer-events-none" : "bg-transparent text-primary hover:bg-gray-200"}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="flex justify-end space-x-4">
                <div className="relative" onClick={(e) => {
                    e.stopPropagation(); // Ngăn event bubble lên
                    setIsOpen(!isOpen);
                }}>
                    <div className="flex items-center space-x-4 cursor-pointer">
                        <img src="img/avt.png" alt="user" className="w-8 h-8 rounded-full" />
                        <div className="hidden md:flex items-center space-x-2 justify-center">
                            <p>Trần Hải Nam</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>


                    {/* Dropdown menu */}
                    {isOpen && (
                        <div ref={dropdownRef} className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border font-medium cursor-auto">
                            <Link to="#" className="block px-4 py-2 hover:bg-[#f26f33] hover:text-white">Cài đặt</Link>
                            <Link to="#" className="block px-4 py-2 hover:bg-[#f26f33] hover:text-white">Đăng xuất</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
