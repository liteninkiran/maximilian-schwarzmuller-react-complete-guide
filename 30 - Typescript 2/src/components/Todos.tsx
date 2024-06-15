import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

type Props = {
    items: Todo[];
}

const Todos: React.FC<Props> = (props) => {
    return (
        <ul className={classes.todos}>
            {
                props.items.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))
            }
        </ul>
    );
};

export default Todos;
