import Todo from '../models/todo';
import classes from './TodoItem.module.css';

type Props = {
    todo: Todo;
    onRemoveTodo: (id: string) => void;
}

const TodoItem: React.FC<Props> = (props) => {
    const removeTodoHandler = () => props.onRemoveTodo(props.todo.id)
    return (
        <li
            className={classes.item}
            onClick={removeTodoHandler}
        >
            {props.todo.text}
        </li>
    );
};

export default TodoItem;
