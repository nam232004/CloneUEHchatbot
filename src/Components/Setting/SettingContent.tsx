import { SettingContentProps } from "../Types/Setting";
import { ButtonCPN } from "../Button/Button";
import { FormField } from "../FormField/FormField";

export const SettingContent = ({ activeSection, onOpenSidebar }: SettingContentProps) => {
    return (
        <div className="p-6 w-full">
            {activeSection === 'profile' && (
                <div>
                    <form>
                        <div className="space-y-6 col-span-3 shadow-md rounded-lg p-6">
                            <FormField
                                id="username"
                                label="Tên người dùng"
                                placeholder="Nhập tên người dùng"
                                variant="horizontal" 
                                required
                            />
                            <FormField
                                id="firstName"
                                label="Tên"
                                placeholder="Nhập tên của bạn"
                                variant="horizontal" 
                                required
                            />
                            <FormField
                                id="lastName"
                                label="Họ"
                                placeholder="Nhập họ của bạn"
                                variant="horizontal" 
                                required
                            />
                            <FormField
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="Nhập địa chỉ email của bạn"
                                variant="horizontal" 
                                readOnly={true}
                                disabled={true}
                            />
                            <div className="grid grid-cols-4 gap-10">
                                <span className="col-start-2 col-span-3 text-sm text-red-500 self-end">
                                    Email không thể thay đổi
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 ">
                            <div className="flex justify-end space-x-4 pt-6">
                                <ButtonCPN>
                                    Hủy
                                </ButtonCPN>
                                <ButtonCPN
                                    type="submit"
                                    variant="primary"
                                >
                                    Lưu thay đổi
                                </ButtonCPN>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};