import {Navigate, useRoutes} from 'react-router-dom';
// layouts
// pages
import NotFound from './pages/Page404';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import DashboardLayout from './layouts/dashboard';
import SearchMain from './pages/SearchMain';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'products', element: <Products /> },
        { path: 'search', element: <SearchMain /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
