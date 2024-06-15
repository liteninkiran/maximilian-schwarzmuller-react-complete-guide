type Props = {
    items: string[];
}

const Todos: React.FC<Props> = (props) => {
    return (
        <ul>
            {
                props.items.map((item) => (
                    <li key={item}>{item}</li>
                ))
            }
        </ul>
    );
};

export default Todos;
