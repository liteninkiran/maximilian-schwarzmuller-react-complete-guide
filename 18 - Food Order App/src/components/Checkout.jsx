// React
import { useContext } from 'react';

// Components
import Button from './UI/Button.jsx';
import Input from './UI/Input.jsx';
import Modal from './UI/Modal.jsx';

// Contexts
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

// Helpers
import { currencyFormatter } from '../util/formatting.js';

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const handleClose = () => userCtx.hideCheckout();
    const handleSubmit = event => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const order = {
            items: cartCtx.items,
            customer: data,
        }
        const url = 'http://localhost:3000/orders';
        const method = 'POST';
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ order });
        const options = { method, headers, body }
        fetch(url, options);
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

                {/* Close | Submit */}
                <p className='modal-actions'>
                    <Button type='button' textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>

            </form>
        </Modal>
    )
}

export default Checkout;
