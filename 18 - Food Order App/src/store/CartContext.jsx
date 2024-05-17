import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: item => {},
    removeItem: id => {},
});

const cartReducer = (state, action) => {
    const id = action.type === 'ADD_ITEM' ? action.item.id : action.id;
    const index = state.items.findIndex(item => item.id === id);
    const newItems = [...state.items];
    const item = index > -1 ? state.items[index] : null;

    if (action.type === 'ADD_ITEM') {
        if (item) {
            const newItem = { ...item, quantity: item.quantity + 1 }
            newItems[index] = newItem;
        } else {
            newItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: newItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        if (item.quantity === 1) {
            newItems.splice(index, 1);
        } else {
            const newItem = { ...item, quantity: item.quantity - 1 }
            newItems[index] = newItem;
        }

        return { ...state, items: newItems };
    }

    return state;
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
    const addItem = item => dispatchCartAction({ type: 'ADD_ITEM', item });
    const removeItem = id => dispatchCartAction({ type: 'REMOVE_ITEM', id });
    const cartContext = { items: cart.items, addItem, removeItem }
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
