import Todo from '../models/todo';
import classes from './TodoItem.module.css';

type Props = {
    todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
    return <li className={classes.item}>{props.todo.text}</li>;
};

export default TodoItem;
