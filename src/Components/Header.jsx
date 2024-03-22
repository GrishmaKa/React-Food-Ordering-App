import { useContext } from 'react';
import Button from './UI/Button';
import LogoImg from '/src/assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {

    const cartContxt = useContext(CartContext);

    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartContxt.items.reduce((totalNumberofItems, item) => {
        return totalNumberofItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={LogoImg} alt="Logo" />
                <h1>
                    React Food Page
                </h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
            </nav>
        </header>
    );
}