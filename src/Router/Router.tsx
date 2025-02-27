
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../Components/Layout/Layout";
import ChatPage from "../Pages/ChatPage";
import AgentPage from "../Pages/AgentPage";
import SettingPage from "../Pages/SettingPage";
import AuthPage from "../Pages/AuthPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <ChatPage /> },
            { path: "chat", element: <ChatPage /> },
            { path: "agents", element: <AgentPage /> },
            { path: "setting", element: <SettingPage /> },
        ],
    },
    {
        path: "auth",
        element: <AuthPage />
    },
    {
        path: "*",
        element: (
            <div className="mt-10 text-xl text-center text-red-500">
                404 - Trang không tồn tại
            </div>
        ),
    },
]);



const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
