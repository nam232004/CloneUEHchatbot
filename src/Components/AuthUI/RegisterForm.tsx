import { useState, FormEvent } from 'react';
import { ButtonCPN } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks';
import { clearError, register } from '../../Store/AuthSlice';
import { Icons } from '../../assets/Icon/Icon';
import { FormProps } from '../Types/Form';

export const RegisterForm = ({ onSwitchForm }: FormProps) => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector(state => state.auth);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const [localError, setLocalError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        console.log(`Thay đổi field: ${name}, Giá trị:`, newValue); // Debug

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (formData.password !== formData.confirmPassword) {
            console.log("Mật khẩu không khớp!");
            return;
        }

        console.log("Dữ liệu gửi đi:", formData);

        const result = await dispatch(register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }));

        if (register.fulfilled.match(result)) {
            onSwitchForm();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto scrollbar-none p-0.5">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Đăng ký</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 ">
                {(error || localError) && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {localError || error}
                    </div>
                )}

                <div className="flex gap-4">
                    <ButtonCPN
                        type="button"
                        variant="secondary"
                        className="w-1/2"
                        icon={<Icons.Google />}
                    >
                        Google
                    </ButtonCPN>
                    <ButtonCPN
                        type="button"
                        variant="secondary"
                        className="w-1/2"
                        icon={<Icons.Google />}
                    >
                        Facebook
                    </ButtonCPN>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Hoặc đăng ký với email
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        id="firstName"
                        name="firstName"
                        label="Tên"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        variant="vertical"
                    />
                    <FormField
                        id="lastName"
                        name="lastName"
                        label="Họ"
                        type="text"
                        placeholder="Nhập họ của bạn"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        variant="vertical"
                    />
                </div>

                <FormField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    variant="vertical"
                />

                <FormField
                    id="password"
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    variant="vertical"
                />

                <FormField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="Nhập lại mật khẩu của bạn"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    variant="vertical"
                />

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={formData.terms}
                            onChange={handleChange}
                            required
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-600">
                            Tôi đồng ý với sự đồng ý
                        </label>
                    </div>
                </div>

                <ButtonCPN
                    type="submit"
                    variant="primary"
                    className="w-full justify-center items-center bg-gradient-to-r from-tri to-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </ButtonCPN>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Đã có tài khoản? </span>
                    <button
                        type="button"
                        onClick={onSwitchForm}
                        className="font-medium text-primary hover:text-primary/80"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
};
