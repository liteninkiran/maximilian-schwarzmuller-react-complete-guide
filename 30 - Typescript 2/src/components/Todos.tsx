import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

type Props = {
    items: Todo[];
    onRemoveTodo: (id: string) => void;
}

const Todos: React.FC<Props> = (props) => {
    return (
        <ul className={classes.todos}>
            {
                props.items.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onRemoveTodo={props.onRemoveTodo}
                    />
                ))
            }
        </ul>
    );
};

export default Todos;
