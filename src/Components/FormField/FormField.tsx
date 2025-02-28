import { useState } from 'react';
import { Icons } from '../../assets/Icon/Icon';
import { FormFieldProps } from '../Types/Form';

export const FormField = ({
    id,
    name,
    label,
    type = "text",
    placeholder,
    required = false,
    variant = 'horizontal',
    value,
    onChange
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const containerClassName = variant === 'horizontal'
        ? "grid grid-cols-4 gap-8 items-center"
        : "flex flex-col space-y-2";

    const labelClassName = variant === 'horizontal'
        ? "text-sm font-medium text-gray-700"
        : "text-sm font-medium text-gray-700";

    const inputContainerClassName = variant === 'horizontal'
        ? "col-span-3"
        : "w-full";

    return (
        <div className={containerClassName}>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <div className={inputContainerClassName}>
                <div className="relative">
                    <input
                        id={id}
                        name={name || id}
                        type={inputType}
                        className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                        placeholder={placeholder}
                        required={required}
                        value={value}
                        onChange={onChange}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};