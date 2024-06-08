import Routes from '@/constants/path';
import { AppContext } from '@/contexts/app.context';
import CartLayout from '@/layouts/CartLayout';
import MainLayout from '@/layouts/MainLayout';
import RegisterLayout from '@/layouts/RegisterLayout';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProductDetail from '@/pages/ProductDetail';
import ProductList from '@/pages/ProductList';
import Register from '@/pages/Register';
import UserLayout from '@/pages/User/layouts/Userlayout';
import ChangePassword from '@/pages/User/pages/ChangePassword';
import HistoryPurchase from '@/pages/User/pages/HistoryPurchase';
import Profile from '@/pages/User/pages/Profile';
import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={Routes.Login} />;
};

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={Routes.Home} />;
};

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: Routes.Cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: Routes.User,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: Routes.Profile,
              element: <Profile />
            },
            {
              path: Routes.ChangePassword,
              element: <ChangePassword />
            },
            {
              path: Routes.HistoryPurchase,
              element: <HistoryPurchase />
            }
          ]
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
      path: Routes.ProductDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: Routes.Login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: Routes.Register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ]);

  return routeElements;
};

export default useRouteElements;
