import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
import NotFound from './pages/Page404';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'products', element: <Products /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
