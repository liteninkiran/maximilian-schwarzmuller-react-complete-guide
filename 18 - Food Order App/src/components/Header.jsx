import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';

const Header = () => {
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='Restaurant' />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    );
}

export default Header;
