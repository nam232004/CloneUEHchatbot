
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../Components/Layout/Layout";
import ChatPage from "../Pages/ChatPage";
import AgentPage from "../Pages/AgentPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <ChatPage /> },
            { path: "chatPage", element: <ChatPage /> },
            { path: "agents", element: <AgentPage /> },
        ],
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
