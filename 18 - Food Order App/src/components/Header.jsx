import { useContext } from 'react';

import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

const Header = () => {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const totalItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);
    const handleShowCart = () => userCtx.showCart();
    
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='A restaurant' />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalItems})</Button>
            </nav>
        </header>
    );
}

export default Header;
