import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function CartItem({ name, quantity, price, onIncrease, onDescrese }) {

    return (
        <ul>
            <li className="cart-item">
                <p> {name} - {quantity} * {currencyFormatter.format(price)}</p>
                <p className="cart-item-actions">
                    <button onClick={onDescrese}>-</button>
                    <span>{quantity}</span>
                    <button onClick={onIncrease}>+</button>
                </p>
            </li>
        </ul>
    );
}