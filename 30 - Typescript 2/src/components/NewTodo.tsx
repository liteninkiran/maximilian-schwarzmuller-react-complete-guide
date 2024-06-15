import { useRef } from "react";

const NewTodo = () => {
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const text = todoTextInputRef.current!.value;
        if (text.trim().length === 0) {
            return;
        }
        
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
