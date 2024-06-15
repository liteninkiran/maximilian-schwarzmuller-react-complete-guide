import { useContext, useRef } from 'react';
import { TodosContext } from '../store/todos-context';
import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const text = todoTextInputRef.current!.value;
        if (text.trim().length === 0) {
            return;
        }
        todosCtx.addTodo(text);
    }
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor='todo-text'>Todo Text</label>
            <input type='text' id='todo-text' ref={todoTextInputRef} />
            <button>Add Todo</button>
        </form>
    );
}

export default NewTodo;
