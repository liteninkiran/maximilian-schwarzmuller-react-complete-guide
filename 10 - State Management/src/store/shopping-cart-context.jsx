import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

const shoppingCartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const quantity = existingCartItem.quantity + 1;
            const updatedItem = { ...existingCartItem, quantity }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            const updatedItem = {
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            }
            updatedItems.push(updatedItem);
        }

        return {
            ...state,
            items: updatedItems,
        };

    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(item => item.id === action.payload.productId);

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {
    const initialState = {
        items: [],
    }
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, initialState);
    const handleAddItemToCart = (id) => {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id,
        });
    }

    const handleUpdateCartItemQuantity = (productId, amount) => {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: { productId, amount },
        });

    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
}
