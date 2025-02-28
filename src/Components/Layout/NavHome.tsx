import { useState, useEffect, useRef, RefObject } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../Store";
import { setActiveIndex } from "../../Store/NavSlice";
import { useClickOutside } from "../Hooks/HandleOutsideClick";
import { NavItem } from "../Types/Nav";
import { Icons } from "../../assets/Icon/Icon";
import { logout } from "../../Store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/Hooks";

const NavItems: NavItem[] = [
    {
        name: "Chat",
        icon: <Icons.Chat />,
        to: "/chat"
    },
    {
        name: "Agents",
        icon: <Icons.UserCircle />,
        to: "/agents"
    },
    {
        name: "File Manager",
        icon: <Icons.Document />,
        to: "/file"
    }
];

export const NavHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const activeIndex = useAppSelector((state: RootState) => state.nav.activeIndex);
    const user = useAppSelector((state: RootState) => state.auth.user);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const navDropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef as RefObject<HTMLElement>, () => setIsOpen(false));
    useClickOutside(navDropdownRef as RefObject<HTMLElement>, () => setIsOpenNav(false));

    useEffect(() => {
        const currentIndex = NavItems.findIndex(item => item.to === location.pathname);
        dispatch(setActiveIndex(currentIndex !== -1 ? currentIndex : null));
    }, [location.pathname, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    // Tính toán display name
    const displayName = user ? `${user.firstName} ${user.lastName}` : 'User';

    return (
        <nav className="flex items-center justify-between px-6 py-2 bg-white text-primary shadow-md font-bold sticky top-0 z-30 h-16">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-4 cursor-pointer">
                <div className="logo">
                    <img src="img/logo.png" alt="logo ueh" className="w-15 h-9" />
                </div>
                <div className="name hidden md:block">UEH Chatbot</div>
            </div>

            {/* Dropdown responsive */}
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        {NavItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                onClick={() => setIsOpenNav(false)}
                                className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f26f33] hover:text-white"
                            >
                                {item.icon}
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
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="flex justify-end space-x-4">
                <div className="relative" onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}>
                    <div className="flex items-center space-x-4 cursor-pointer">
                        <img src="img/avt.png" alt="user" className="w-8 h-8 rounded-full" />
                        <div className="hidden md:flex items-center space-x-2 justify-center">
                            <p className="text-sm font-medium">
                                {displayName}
                            </p>
                            <Icons.Dropdown />
                        </div>
                    </div>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div ref={dropdownRef} className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border font-medium cursor-auto w-28">
                            <Link to="/setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f26f33] hover:text-white">
                                Cài đặt
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f26f33] hover:text-white"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
