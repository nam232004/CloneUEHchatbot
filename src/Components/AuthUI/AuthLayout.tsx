import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthLayout: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitchForm = () => {
        setIsLogin(!isLogin);
    };

    console.log(isLogin);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex relative h-[600px]">

                    <div className={`w-full md:w-1/2 p-6 relative z-10 transition-transform duration-700 ease-in-out ${isLogin ? 'md:translate-x-full' : 'md:translate-x-0'}`}>
                        {isLogin ? (
                            <LoginForm onSwitchForm={handleSwitchForm} />
                        ) : (
                            <RegisterForm onSwitchForm={handleSwitchForm} />
                        )}
                    </div>

                    <div
                        className={`absolute z-20 top-0 w-full md:w-1/2 h-full transition-all duration-700 ease-in-out transform ${isLogin ? 'left-0' : 'translate-x-full'} md:block hidden`}
                    >
                        <div className="absolute inset-0 bg-primary">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70">
                                <img
                                    src={isLogin ? "img/ueh-login.png" : "img/register.png"}
                                    alt="Auth illustration"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
                                />
                            </div>

                            <div className="relative h-full p-12 text-white flex flex-col justify-center items-center text-center">
                                <h2 className="text-4xl font-bold mb-6">
                                    {isLogin ? 'Chào mừng trở lại!' : 'Tham gia cùng chúng tôi!'}
                                </h2>
                                <p className="text-lg mb-8 text-white/90">
                                    {isLogin
                                        ? 'Để tiếp tục cuộc hành trình của bạn với chúng tôi, vui lòng đăng nhập.'
                                        : 'Đăng ký tài khoản để trải nghiệm đầy đủ các tính năng.'}
                                </p>
                                <button
                                    onClick={handleSwitchForm}
                                    className="px-8 py-3 border-2 border-white rounded-lg text-white hover:bg-tri/90 hover:text-white transition-colors"
                                >
                                    {isLogin ? 'Tạo tài khoản mới' : 'Đã có tài khoản? Đăng nhập'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
