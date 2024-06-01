import UrlPath from '@/constants/path';
import { AppContext } from '@/contexts/app.context';
import CartLayout from '@/layouts/CartLayout';
import MainLayout from '@/layouts/MainLayout';
import RegisterLayout from '@/layouts/RegisterLayout';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
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
  return isAuthenticated ? <Outlet /> : <Navigate to={UrlPath.Login} />;
};

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={UrlPath.Home} />;
};

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: UrlPath.Cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: UrlPath.User,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: UrlPath.Profile,
              element: <Profile />
            },
            {
              path: UrlPath.ChangePassword,
              element: <ChangePassword />
            },
            {
              path: UrlPath.HistoryPurchase,
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
      path: UrlPath.ProductDetail,
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
          path: UrlPath.Login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: UrlPath.Register,
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
