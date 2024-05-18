import { configureStore, createSlice } from '@reduxjs/toolkit';

const intialState = {
    counter: 0,
    showCounter: true,
}

const counterSlice = createSlice({
    name: 'counter',
    intialState,
    reducers: {
        increment(state) { state.counter++; },
        decrement(state) { state.counter--; },
        increase(state, action) { state.counter = state.counter + action.amount; },
        toggle(state) { state.showCounter = !state.showCounter; },
    },
});


const store = configureStore({
    reducer: counterSlice.reducer
});

export default store;
