import MainLayout from '@/layouts/MainLayout';
import RegisterLayout from '@/layouts/RegisterLayout';
import Login from '@/pages/Login';
import ProductList from '@/pages/ProductList';
import Profile from '@/pages/Profile';
import Register from '@/pages/Register';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

const RejectedRoute = () => {
  const isAuthenticated = false;
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ]);

  return routeElements;
};

export default useRouteElements;
