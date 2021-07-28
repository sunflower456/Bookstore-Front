import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// pages
// import Login from './pages/Login';
import NotFound from './pages/Page404';
import Login from './pages/Login';
import DashboardLayout from './layouts/dashboard';
import Products from './pages/Products';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: 'products', element: <Products /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
