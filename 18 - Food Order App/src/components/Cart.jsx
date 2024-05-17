// React
import { useContext } from 'react';

// Components
import Button from './UI/Button.jsx';
import CartItem from './CartItem.jsx';
import Modal from './UI/Modal.jsx';

// Contexts
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

// Helpers
import { currencyFormatter } from '../util/formatting.js';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const handleCloseCart = () => userCtx.hideCart();
    const handleGoToCheckout = () => userCtx.showCheckout();
    return (
        <Modal
            className='cart'
            open={userCtx.progress === 'cart'}
            onClose={userCtx.progress === 'cart' ? handleCloseCart : null}
        >

            {/* Title */}
            <h2>
                Your Cart
            </h2>

            {/* Cart Items */}
            <ul>
                {
                    cartCtx.items.map(
                        item => (
                            <CartItem
                                key={item.id}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                onIncrease={() => cartCtx.addItem(item)}
                                onDecrease={() => cartCtx.removeItem(item.id)}
                            />
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
                {
                    cartCtx.items.length > 0 && (
                        <Button onClick={handleGoToCheckout}>
                            Go to Checkout
                        </Button>
                    )
                }
            </p>

        </Modal>
    );
}

export default Cart;
