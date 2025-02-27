export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | undefined;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}