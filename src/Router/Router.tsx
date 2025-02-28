import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "../Components/Layout/Layout";
import ChatPage from "../Pages/ChatPage";
import AgentPage from "../Pages/AgentPage";
import SettingPage from "../Pages/SettingPage";
import AuthPage from "../Pages/AuthPage";
import { ProtectedRoute } from "../Components/ProtectedRoute/ProtectedRoute";
import FilePage from "../Pages/FilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/chat" replace />
            },
            { path: "chat", element: <ChatPage /> },
            { path: "agents", element: <AgentPage /> },
            { path: "setting", element: <SettingPage /> },
            { path: "file", element: <FilePage /> },
        ],
    },
    {
        path: "auth",
        element: <AuthPage />,
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
