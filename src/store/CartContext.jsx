import React, { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingCartItemIndex = state.items.findIndex(
                item => item.id === action.item.id
            );

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {
                const existingItem = state.items[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };

        case 'REMOVE_ITEM':
            const updatedItemsRemove = state.items.filter(item => item.id !== action.id);
            return { ...state, items: updatedItemsRemove };

        case 'CLEAR_CART':
            return { ...state, items: [] };

        default:
            return state;
    }
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const addToCart = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    };

    const removeFromCart = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    };
    const clearCart = () => {
        dispatchCartAction({ type: 'CLEAR_CART' });
    };

    const cartContext = {
        items: cart.items,
        addToCart,
        removeFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
