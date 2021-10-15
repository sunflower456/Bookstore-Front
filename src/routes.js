import { useRoutes, Navigate } from "react-router-dom";
// layouts
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import DashboardLayout from "./layouts/dashboard";
// pages
import NotFound from "./pages/Page404";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import MySales from "./pages/MySales";
import Favorites from "./pages/Favorites";
import isLogin from "./modules/isLogin";
import MessengerLayout from "./layouts/MessengerLayout";
import ChatPage from "./pages/ChatPage";

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <DashboardLayout />,
            children: [{ path: "/", element: <Products /> }]
        },
        {
            path: "/",
            element: <LogoOnlyLayout />,
            children: [
                { path: "404", element: <NotFound /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> }
            ]
        },
        {
            path: "/mypage",
            element: <DashboardLayout />,
            children: [
                {
                    path: "",
                    element: isLogin() ? <MyPage /> : <Navigate to="/login" />
                },
                {
                    path: "sales",
                    element: isLogin() ? <MySales /> : <Navigate to="/login" />
                },
                {
                    path: "favorites",
                    element: isLogin() ? (
                        <Favorites />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            ]
        },
        {
            path: "/products",
            element: <DashboardLayout />,
            children: [
                {
                    path: "addPost",
                    element: isLogin() ? <Post /> : <Navigate to="/login" />
                },
                {
                    path: ":id",
                    element: isLogin() ? <Detail /> : <Navigate to="/login" />
                }
            ]
        },
        {
            path: "/chat",
            element: <MessengerLayout />,
            children: [{ path: "", element: <ChatPage /> }]
        }

        // { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
