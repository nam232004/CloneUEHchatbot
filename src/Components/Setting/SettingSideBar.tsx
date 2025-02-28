import { Icons } from "../../assets/Icon/Icon";
import { SettingSidebarProps } from "../Types/Setting";

export const SettingSidebar = ({
    activeSection,
    setActiveSection,
    isSidebarOpen,
    setIsSidebarOpen
}: SettingSidebarProps) => {
    const menuItems = [
        {
            id: 'profile', label: 'Thông tin cá nhân', icon: <Icons.User />
        },
        { id: 'test', label: 'test', icon: 'test' },
    ];

    console.log(isSidebarOpen);
    return (
        <div className="relative">
            <aside className={`
                fixed md:sticky top-[60px] left-0
                w-[280px] h-screen
                bg-white border-r
                transition-transform duration-300 ease-in-out
                z-20
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <button
                    title="close"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                        absolute top-0 m-2 -right-16
                        md:hidden
                        p-3 rounded-lg
                        bg-primary text-white
                        shadow-md
                        transition-opacity duration-300 z-50
                        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}
                >
                    <Icons.ArrowLeft />
                </button>

                <div className="flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                setIsSidebarOpen(true);
                            }}
                            className={`
                                w-full text-left px-4 py-3 mt-2
                                flex items-center space-x-3
                                ${activeSection === item.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}
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

        </div>
    );
};