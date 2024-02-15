import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import './index.css';
//import Menu from './pages/Menu/Menu.tsx';
import { PREFIX } from './helpers/API.ts';
import RequireAuth from './helpers/RequireAuth.tsx';
import { store } from './store/store.ts';
import Product from './pages/Product/Product.tsx';
import Login from './pages/Login/Login.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Register from './pages/Register/Register.tsx';
import Error from './pages/Error/Error.tsx';
import Layout from './layout/Layout/Layout.tsx';
import AuthLayout from './layout/AuthLayout/AuthLayout.tsx';
import Success from './pages/Success/Success.tsx';

export const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: 'product/:id',
				element: <Product />,
				errorElement: <>Error!</>,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			},
			{
				path: '*',
				element: <Error />
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
