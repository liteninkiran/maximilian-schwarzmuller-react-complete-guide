import { useContext } from 'react';

import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const handleCloseCart = () => userCtx.hideCart();
    return (
        <Modal className='cart' open={userCtx.progress === 'cart'}>

            {/* Title */}
            <h2>
                Your Cart
            </h2>

            {/* Cart Items */}
            <ul>
                {
                    cartCtx.items.map(
                        item => (
                            <li key={item.id}>{item.name} - {item.quantity}</li>
                        )
                    )
                }
            </ul>

            {/* Cart Total Price */}
            <p className='cart-total'>
                {currencyFormatter.format(cartTotal)}
            </p>

            {/* User Actions */}
            <p className='modal-actions'>

                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>

                <Button onClick={handleCloseCart}>
                    Go to Checkout
                </Button>

            </p>

        </Modal>
    );
}

export default Cart;
