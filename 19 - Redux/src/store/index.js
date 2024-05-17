import { createStore } from 'redux';

const intialState = { counter: 0 }
const counterReducer = (state = intialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
        };
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
        };
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
        };
    }

    return state;
};

const store = createStore(counterReducer);

export default store;
