import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

const increment = 10;
const Counter = () => {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const incrementHandler = () => dispatch({ type: 'increment' });
    const increaseHandler  = () => dispatch({ type: 'increase', amount: increment });
    const decrementHandler = () => dispatch({ type: 'decrement' });
    const toggleCounterHandler = () => { };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <div>
                <button onClick={decrementHandler}>Decrement</button>
                <button onClick={increaseHandler}>Increase by {increment}</button>
                <button onClick={incrementHandler}>Increment</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
