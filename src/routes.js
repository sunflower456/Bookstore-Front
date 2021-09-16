import { useRoutes } from "react-router-dom";
// layouts
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import DashboardLayout from "./layouts/dashboard";
// pages
import NotFound from "./pages/Page404";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import SearchMain from "./pages/SearchMain";
import Post from "./pages/Post";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import MySales from "./pages/MySales";
import Favorites from "./pages/Favorites";

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: "/404",
            element: <LogoOnlyLayout />,
            children: [{ path: "/", element: <NotFound /> }]
        },
        {
            path: "/login",
            element: <LogoOnlyLayout />,
            children: [{ path: "/", element: <Login /> }]
        },
        {
            path: "/register",
            element: <LogoOnlyLayout />,
            children: [{ path: "/", element: <Register /> }]
        },
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                { path: "/", element: <Products /> },
                { path: "sales", element: <MySales /> },
                { path: "favorites", element: <Favorites /> }
            ]
        },
        {
            path: "/mypage",
            element: <DashboardLayout />,
            children: [{ path: "/", element: <MyPage /> }]
        },
        {
            path: "/products",
            element: <DashboardLayout />,
            children: [
                { path: "search", element: <SearchMain /> },
                { path: "addPost", element: <Post /> },
                { path: ":id", element: <Detail /> }
            ]
        }

        // { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
