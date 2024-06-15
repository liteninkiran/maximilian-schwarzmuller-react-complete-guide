import { useRef } from "react";

type Props = {
    onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<Props> = (props) => {
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const text = todoTextInputRef.current!.value;
        if (text.trim().length === 0) {
            return;
        }
        props.onAddTodo(text);
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor='todo-text'>Todo Text</label>
            <input type='text' id='todo-text' ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    );
}

export default NewTodo;
