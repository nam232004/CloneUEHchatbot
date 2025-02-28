import { useState, useEffect, FormEvent } from 'react';
import { SettingContentProps } from "../Types/Setting";
import { ButtonCPN } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks';
import { updateUserProfile, clearMessages } from '../../Store/UserSlice';
import { Icons } from '../../assets/Icon/Icon';

export const SettingContent = ({ activeSection, onOpenSidebar }: SettingContentProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const { isLoading, error, successMessage } = useAppSelector(state => state.user);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || ''
            });
        }
    }, [user]);

    useEffect(() => {
        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setIsDirty(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            await dispatch(updateUserProfile({
                id: user.id,
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName
            })).unwrap();

            setIsDirty(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                username: user.username || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || ''
            });
            setIsDirty(false);
        }
    };

    if (activeSection !== 'profile') return null;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center p-4 md:px-6">
                <button
                    title="menu"
                    onClick={onOpenSidebar}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 bg-primary text-white"
                >
                    <Icons.Hamburger />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 col-span-3 shadow-md rounded-lg p-6">
                        {(error || successMessage) && (
                            <div className={`p-3 rounded-lg ${error ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                {error || successMessage}
                            </div>
                        )}

                        <FormField
                            id="username"
                            name="username"
                            label="Tên người dùng"
                            placeholder="Nhập tên người dùng"
                            variant="horizontal"
                            required
                            value={formData.username ? formData.username : formData.email}
                            onChange={handleChange}
                        />
                        <FormField
                            id="firstName"
                            name="firstName"
                            label="Tên"
                            placeholder="Nhập tên của bạn"
                            variant="horizontal"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <FormField
                            id="lastName"
                            name="lastName"
                            label="Họ"
                            placeholder="Nhập họ của bạn"
                            variant="horizontal"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <FormField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
                            variant="horizontal"
                            value={formData.email}
                            readOnly
                            disabled
                        />
                        <div className="grid grid-cols-4 gap-10">
                            <span className="col-start-2 col-span-3 text-sm text-red-500 self-end">
                                Email không thể thay đổi
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 pt-6">
                        <ButtonCPN
                            type="button"
                            onClick={handleCancel}
                            disabled={!isDirty || isLoading}
                        >
                            Hủy
                        </ButtonCPN>
                        <ButtonCPN
                            type="submit"
                            variant="primary"
                            disabled={!isDirty || isLoading}
                            className='font-bold'
                        >
                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </ButtonCPN>
                    </div>
                </form>
            </div>
        </div>
    );
};