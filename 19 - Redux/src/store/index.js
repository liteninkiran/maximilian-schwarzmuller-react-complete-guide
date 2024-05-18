import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const intialState = {
    counter: 0,
    showCounter: true,
}

createSlice({
    name: 'counter',
    intialState,
    reducers: {
        increment(state) { state.counter++; },
        decrement(state) { state.counter--; },
        increase(state, action) { state.counter = state.counter + action.amount; },
        toggle(state) { state.showCounter = !state.showCounter; },
    },
});

const counterReducer = (state = intialState, action) => {
    const newState = structuredClone(state);

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
