import React, { useCallback, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCountCart } from './utils/counterCartSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Home from './pages/client/Home';
import Cart from './pages/client/Cart';
import Contact from './pages/client/Contact';
import ProductDetail from './pages/client/ProductDetail';
import LayoutClient from './pages/client/LayoutClient';
import Profile from './pages/client/Profile';
import About from './pages/client/About';
import OrderDetail from './pages/client/OrderDetail';
import OrderSuccess from './pages/client/OrderSuccess';
import ChangePassword from './pages/client/ChangePassword';
import Index from './pages/client/Index';
import ForgotPassword from './components/client/ForgotPassword';
import LayoutAdmin from './pages/admin/LayoutAdmin';
import Brands from './pages/admin/Brands';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import OrderDetail2 from './pages/admin/OrderDetail';
import Statistical from './pages/admin/Statistical';
import Users from './pages/admin/Users';
import requestHandler from './utils/requestHandle';

const routes = [
  { path: '/', element: <Index /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/error', element: <Error /> },
  {
    path: '/client',
    element: <LayoutClient />,
    childrens: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'product-detail/:id', element: <ProductDetail /> },
      { path: 'order-detail', element: <OrderDetail /> },
      { path: 'order-success', element: <OrderSuccess /> },
      { path: 'cart', element: <Cart /> },
      { path: 'contact', element: <Contact /> },
      { path: 'profile', element: <Profile /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'about', element: <About /> },
    ],
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    childrens: [
      { path: 'brands', element: <Brands /> },
      { path: 'products', element: <Products /> },
      { path: 'orders', element: <Orders /> },
      { path: 'order-detail/:id', element: <OrderDetail2 /> },
      { path: 'statistical', element: <Statistical /> },
      { path: 'users', element: <Users /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.counterCart.isLoading);

  const fetchCountCart = useCallback(async () => {
    try {
      const response = await requestHandler.get('cart/');
      const carts = response?.data?.data;
      const count = Array.isArray(carts) ? carts.length : 0;
      dispatch(setCountCart(count));
    } catch {
      dispatch(setCountCart(0));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchCountCart();
  }, [fetchCountCart]);

  const renderRoutes = (routes) => {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={route.element}
      >
        {route.childrens && renderRoutes(route.childrens)}
      </Route>
    ));
  };

  return (
    <div className='relative'>
      <Routes>{renderRoutes(routes)}</Routes>

      {isLoading && (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-400 opacity-50 flex justify-center items-center'>
          <ReactLoading
            type='spinningBubbles'
            color='red'
          />
        </div>
      )}
    </div>
  );
}
