import { useState, FormEvent, useEffect } from 'react';
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
        registerFirstName: '',
        registerLastName: '',
        registerEmail: '',
        registerPassword: '',
        confirmPassword: '',
        terms: false
    });

    const [localError, setLocalError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        console.log('Input Change Event:', { name, value, type, checked });

        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prevData => {
            const newData = {
                ...prevData,
                [name]: newValue
            };
            console.log('Updated Form Data:', newData);
            return newData;
        });
    };

    // Add effect to monitor form data changes
    useEffect(() => {
        console.log('Form Data Changed:', formData);
    }, [formData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Submit Event Triggered');
        console.log('Current Form Data:', formData);

        dispatch(clearError());
        setLocalError(null);

        // Validate all fields
        const emptyFields = Object.entries(formData)
            .filter(([key, value]) => key !== 'terms' && !value)
            .map(([key]) => key);

        if (emptyFields.length > 0) {
            console.log('Empty fields:', emptyFields);
            setLocalError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (formData.registerPassword !== formData.confirmPassword) {
            setLocalError("Mật khẩu không khớp!");
            return;
        }

        if (!formData.terms) {
            setLocalError("Vui lòng đồng ý với điều khoản");
            return;
        }

        try {
            const result = await dispatch(register({
                registerFirstName: formData.registerFirstName,
                registerLastName: formData.registerLastName,
                registerEmail: formData.registerEmail,
                registerPassword: formData.registerPassword
            }));

            if (register.fulfilled.match(result)) {
                onSwitchForm();
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto h-full overflow-y-auto scrollbar-none p-0.5">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Đăng ký</h2>
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
                        id="registerFirstName"
                        name="registerFirstName"
                        label="Tên"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        required
                        value={formData.registerFirstName}
                        onChange={handleChange}
                        variant="vertical"
                    />
                    <FormField
                        id="registerLastName"
                        name="registerLastName"
                        label="Họ"
                        type="text"
                        placeholder="Nhập họ của bạn"
                        required
                        value={formData.registerLastName}
                        onChange={handleChange}
                        variant="vertical"
                    />
                </div>

                <FormField
                    id="registerEmail"
                    name="registerEmail"
                    label="Email"
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    required
                    value={formData.registerEmail}
                    onChange={handleChange}
                    variant="vertical"
                />

                <FormField
                    id="registerPassword"
                    name="registerPassword"
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    required
                    value={formData.registerPassword}
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
                    className="w-full justify-center items-center bg-gradient-to-r from-tri/90 to-tri/70 hover:opacity-90 transition-opacity"
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
