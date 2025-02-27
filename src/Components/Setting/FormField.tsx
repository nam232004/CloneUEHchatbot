import { FormFieldProps } from "../Types/Setting";

export const FormField = ({ id, label, type = "text", placeholder, required = false, readOnly = false, disabled = false }: FormFieldProps) => {
    return (
        <div className="grid grid-cols-4 gap-8 items-center">
            <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {label}
            </label>
            <div className="col-span-3">
                <input
                    id={id}
                    name={id}
                    type={type}
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};