import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Could not fetch cart data.');
            }
            const data = await response.json();
            return data;
        }
        try {
            const cartData =await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification(notifications.fetchError));
        }
    }
}

export const sendCartData = cart => {
    return async dispatch => {
        dispatch(uiActions.showNotification(notifications.pending));
        const options = {
            method: 'PUT',
            body: JSON.stringify(cart),
        }
        const sendRequest = async () => {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification(notifications.success));
        } catch (error) {
            dispatch(uiActions.showNotification(notifications.sendError));
        }
    }
}

export const notifications = {
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
    sendError: {
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
    },
    fetchError: {
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed!',
    },
}

const url = 'https://react-demo-cb134-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

