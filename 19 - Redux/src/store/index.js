import { createStore } from 'redux';

const intialState = {
    counter: 0,
    showCounter: true,
}
const counterReducer = (state = intialState, action) => {
    const newState = {...state}

    if (action.type === 'increment') {
        newState.counter++;
    }

    if (action.type === 'decrement') {
        newState.counter--;
    }

    if (action.type === 'increase') {
        newState.counter = newState.counter + action.amount;
    }

    if (action.type === 'toggle') {
        newState.showCounter = !newState.showCounter;
    }

    return newState;
};

const store = createStore(counterReducer);

export default store;
