export interface SettingContentProps {
    activeSection: string;
    onOpenSidebar: () => void;
}

export interface SettingSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isSidebarResponsive: boolean;
    setIsSidebarResponsive: (value: boolean) => void;
}

