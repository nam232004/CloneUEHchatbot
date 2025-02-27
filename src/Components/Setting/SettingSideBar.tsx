import { Icons } from "../../assets/Icon/Icon";
import { SettingSidebarProps } from "../Types/Setting";


export const SettingSidebar = ({
    activeSection,
    setActiveSection,
    isSidebarResponsive,
    setIsSidebarResponsive
}: SettingSidebarProps) => {
    const menuItems = [
        {
            id: 'profile', label: 'Thông tin cá nhân', icon: <Icons.User />
        },
        { id: 'helo', label: 'Thông tin cá nhân', icon: 'user' },
    ];

    return (
        <aside className={`
            ${isSidebarResponsive ? 'block' : 'hidden'} 
            md:block 
            w-[320px] 
            border-r
            h-screen
            flex flex-col
            fixed md:sticky top-0
            bg-white
        `}>

            <div className="flex-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`
                            w-full text-left px-4 py-3 mt-2
                            flex items-center space-x-3
                            ${activeSection === item.id
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-100'
                            }
                        `}
                    >
                        <span className={activeSection === item.id ? 'text-white' : 'text-gray-500'}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
};