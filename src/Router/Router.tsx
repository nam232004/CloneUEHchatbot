
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import { Layout } from "../Components/Layout/Layout";
import ChatPage from "../Pages/ChatPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "chat", element: <ChatPage /> },
            {
                path: "*",
                element: (
                    <div className="mt-10 text-xl text-center text-red-500">
                        404 - Trang không tồn tại
                    </div>
                ),
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
