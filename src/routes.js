import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
// import Login from './pages/Login';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
