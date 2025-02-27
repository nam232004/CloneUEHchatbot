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

export interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    onClick?: () => void;
    children: React.ReactNode;
}