// React
import { useContext } from 'react';

// Components
import Button from './UI/Button.jsx';
import Input from './UI/Input.jsx';
import Modal from './UI/Modal.jsx';
import Error from './Error.jsx';

// Contexts
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

// Helpers
import { currencyFormatter } from '../util/formatting.js';

// Custom Hooks
import useHttp from '../hooks/useHttp.js';

const requestUrl = 'http://localhost:3000/orders';
const requestConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp(requestUrl, requestConfig);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const handleClose = () => userCtx.hideCheckout();
    const handleFinish = () => {
        userCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    const handleSubmit = event => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const order = {
            items: cartCtx.items,
            customer: data,
        }
        const body = JSON.stringify({ order });
        sendRequest(body);
    }
    const actions = isSending ? (
        <span>Sending order data...</span>
    ) : (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (data && !error) {
        return (
            <Modal open={userCtx.progress === 'checkout'} onClose={handleFinish} >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions"><Button onClick={handleFinish}>Okay</Button></p>
            </Modal>
        );
    }

    return (
        <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>

                {/* Title */}
                <h2>
                    Checkout
                </h2>

                {/* Cart Total */}
                <p>
                    Total Amount: {currencyFormatter.format(cartTotal)}
                </p>

                {/* Name | Email | Street */}
                <>
                    <Input label='Full Name' type='text' id='name' />
                    <Input label='E-Mail Address' type='email' id='email' />
                    <Input label='Street' type='text' id='street' />
                </>

                {/* Post Code | City */}
                <div className='control-row'>
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>

                {/* Error Messages */}
                {error && <Error title='Failed to submit order' message={error} />}

                {/* Close | Submit */}
                <p className='modal-actions'>
                    {actions}
                </p>

            </form>
        </Modal>
    )
}

export default Checkout;
