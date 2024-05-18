import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/index';
import classes from './Counter.module.css';

const delta = 10;
const Counter = () => {
    const counter = useSelector(state => state.counter);
    const show = useSelector(state => state.showCounter);
    const dispatch = useDispatch();
    const incrementHandler = () => dispatch(counterActions.increment());
    const increaseHandler  = () => dispatch(counterActions.increase(delta));
    const decrementHandler = () => dispatch(counterActions.decrement());
    const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={decrementHandler}>Decrement</button>
                <button onClick={increaseHandler}>Increase by {delta}</button>
                <button onClick={incrementHandler}>Increment</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
