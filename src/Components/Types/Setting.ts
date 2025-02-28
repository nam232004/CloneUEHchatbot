export interface SettingContentProps {
    activeSection: string;
    onOpenSidebar: () => void;
}

export interface SettingSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    isSidebarReponsive?: boolean;
    setIsSidebarReponsive?: (isOpen: boolean) => void;
}

