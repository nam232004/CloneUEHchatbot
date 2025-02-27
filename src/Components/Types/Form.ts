export interface FormFieldProps {
    id: string;
    label: string;
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    variant?: 'horizontal' | 'vertical'; 
    icon?: React.ReactNode;
    
}

export interface FormProps {
    onSwitchForm: () => void;
}