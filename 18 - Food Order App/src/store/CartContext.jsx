import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: item => {},
    removeItem: id => {},
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const index = state.items.findIndex(item => item.id === action.item.id);
        const newItems = [...state.items];

        if (index > -1) {
            const item = state.items[index];
            const newItem = { ...item, quantity: item.quantity + 1 };
            newItems[index] = newItem;
        } else {
            newItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: newItems };
    }

    if (action.type === 'REMOVE_ITEM') {
    }

    return state;
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
