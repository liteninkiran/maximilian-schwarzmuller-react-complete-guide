import Todo from '../models/todo';
import TodoItem from './TodoItem';

type Props = {
    items: Todo[];
}

const Todos: React.FC<Props> = (props) => {
    return (
        <ul>
            {
                props.items.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))
            }
        </ul>
    );
};

export default Todos;
