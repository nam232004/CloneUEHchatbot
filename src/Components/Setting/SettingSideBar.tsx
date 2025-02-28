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

    return (
        <aside className={`
            fixed md:sticky top-0 left-0
            w-[280px] h-screen
            bg-white border-r
            transition-transform duration-300 ease-in-out
            z-30
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            <div className="flex items-center justify-between p-4 border-b md:hidden">
                <h2 className="text-lg font-semibold">Cài đặt</h2>
                <button
                    title="close"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                    <Icons.Chat />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveSection(item.id);
                            setIsSidebarOpen(false); 
                        }}
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