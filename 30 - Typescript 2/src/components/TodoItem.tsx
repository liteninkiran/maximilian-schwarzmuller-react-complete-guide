import Todo from '../models/todo';

type Props = {
    todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
    return <li>{props.todo.text}</li>;
};

export default TodoItem;
