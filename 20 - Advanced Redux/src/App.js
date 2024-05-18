import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            const url = 'https://react-demo-cb134-default-rtdb.europe-west1.firebasedatabase.app/cart.json';
            dispatch(uiActions.showNotification(notifications.pending));
            const options = {
                method: 'PUT',
                body: JSON.stringify(cart),
            }
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
            dispatch(uiActions.showNotification(notifications.success));
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch(error => dispatch(uiActions.showNotification(notifications.error)));
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;

const notifications = {
    pending: {
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
    },
    success: {
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
    },
    error: {
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
    },
}
