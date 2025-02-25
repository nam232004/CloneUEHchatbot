import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface NavItem {
    name: string;
    icon: string;
    to: string;
    active?: boolean;
}

export const NavHome = () => {
    const NavItems: NavItem[] = [
        {
            name: "Chat",
            icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
            to: "/chatPage",
            active: true
        },
        {
            name: "Agents",
            icon: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
            to: "/test"
        },
        {
            name: "File Manager",
            icon: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
            to: "/test"
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const defaultIndex = NavItems.findIndex(item => item.active);
        if (defaultIndex !== -1) {
            setActiveIndex(defaultIndex);
        }
    }, []);

    const handleActive = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <nav className="flex items-center justify-between px-6 py-2 bg-white text-primary shadow-md font-bold">
            <div className="flex items-center justify-center space-x-4">
                <div className="logo">
                    <img src="img/logo.png" alt="logo ueh" className="w-15 h-9" />
                </div>
                <div className="name">UEH Chatbot</div>
            </div>
            <div className="flex items-center space-x-4 gap-2">
                {NavItems.map((item, index) => (
                    <Link
                        to={item.to}
                        key={index}
                        onClick={() => handleActive(index)}
                        className={`hover:bg-gray-200 flex items-center space-x-2 p-3 rounded transition duration-300 ${activeIndex === index ? "bg-primary text-white" : "bg-transparent text-primary"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
            <div className="flex justify-end space-x-4">
                <div>
                    <img src="img/logo.png" alt="user" className="w-8 h-8 rounded-full" />
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <p>Trần Hải Nam</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </nav>
    );
};
