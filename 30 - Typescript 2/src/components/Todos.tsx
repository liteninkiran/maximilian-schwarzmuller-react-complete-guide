import Todo from '../models/todo';

type Props = {
    items: Todo[];
}

const Todos: React.FC<Props> = (props) => {
    return (
        <ul>
            {
                props.items.map((item) => (
                    <li key={item.id}>{item.id} - {item.text}</li>
                ))
            }
        </ul>
    );
};

export default Todos;
