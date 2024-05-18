import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        const url = 'https://react-demo-cb134-default-rtdb.europe-west1.firebasedatabase.app/cart.json';
        const options = {
            method: 'PUT',
            body: JSON.stringify(cart),
        }
        fetch(url, options);
    }, [cart]);

    return (
        <Layout>
            {showCart && <Cart />}
            <Products />
        </Layout>
    );
}

export default App;
