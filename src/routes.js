import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
// import Login from './pages/Login';
import NotFound from './pages/Page404';
import Login from './pages/Login';
import {default as Login2} from './pages/LoginType2';
import Products from './pages/Products';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: 'products', element: <Products /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
