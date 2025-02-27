import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonCPN } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks';
import { clearError, login } from '../../Store/AuthSlice';
import { Icons } from '../../assets/Icon/Icon';
import { FormProps } from '../Types/Form';

export const LoginForm = ({ onSwitchForm }: FormProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const [localError, setLocalError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!formData.email || !formData.password) {
            setLocalError("Email và mật khẩu không được để trống");
            return;
        }

        dispatch(clearError());
        const result = await dispatch(login({
            email: formData.email,
            password: formData.password
        }));

        if (login.fulfilled.match(result)) {
            navigate('/chat');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto scrollbar-none p-0.5">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {(error || localError) && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {localError || error}
                    </div>
                )}

                <div className="flex gap-4">
                    <ButtonCPN
                        type="button"
                        className="w-1/2"
                        icon={<Icons.Google />}
                    >
                        Google
                    </ButtonCPN>
                    <ButtonCPN
                        type="button"
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
                            Hoặc đăng nhập với email
                        </span>
                    </div>
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={formData.remember}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <button
                        type="button"
                        className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                <ButtonCPN
                    type="submit"
                    variant="primary"
                    className="w-full justify-center items-center bg-gradient-to-r from-tri to-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </ButtonCPN>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Chưa có tài khoản? </span>
                    <button
                        type="button"
                        onClick={onSwitchForm}
                        className="font-medium text-primary hover:text-primary/80"
                    >
                        Đăng ký ngay
                    </button>
                </div>
            </form>
        </div>
    );
};
