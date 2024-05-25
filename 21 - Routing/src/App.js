import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/root',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'products/:productId', element: <ProductDetailPage /> },
        ],
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
