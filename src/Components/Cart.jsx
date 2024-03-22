import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCtx = useContext(CartContext);

    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Cart</h2>
            <ul>
                {cartCtx.items.map((item) =>
                    <li key={item.id}>
                        <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
                            onIncrease={() => cartCtx.addToCart(item)} onDescrese={() => cartCtx.removeFromCart(item.id)} />
                    </li>)}
            </ul>

            <p className="cart-total">
                <span>{currencyFormatter.format(cartTotal)}</span>
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>

                {cartCtx.items.length > 0 && (<Button onClick={handleShowCheckout}>Checkout</Button>)}
            </p>
        </Modal>

    );
}