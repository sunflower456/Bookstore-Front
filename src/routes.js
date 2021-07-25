import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
// import Login from './pages/Login';
import NotFound from './pages/Page404';
import Login from './pages/Login';
import {default as Login2} from './pages/LoginType2';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: 'login2', element: <Login2 /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
