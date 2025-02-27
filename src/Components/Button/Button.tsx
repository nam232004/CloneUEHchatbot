import { ButtonProps } from "../Types/Button";

export const ButtonCPN = ({
    type = "button",
    variant = "secondary",
    onClick,
    icon,
    children,
    className = '',
    disabled = false,
}: ButtonProps) => {
    const baseStyles = "px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2";
    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "border border-gray-300 hover:bg-gray-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            disabled={disabled}
        >
            {icon}
            {children}
        </button>
    );
};