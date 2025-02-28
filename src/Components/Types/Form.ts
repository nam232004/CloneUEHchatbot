import { ChangeEvent, ReactNode } from 'react';

export interface FormFieldProps {
    id: string;
    name?: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    variant?: 'horizontal' | 'vertical';
    icon?: ReactNode;
    value?: string | number | readonly string[];
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    disabled?: boolean;
}

export interface FormProps {
    onSwitchForm: () => void;
}