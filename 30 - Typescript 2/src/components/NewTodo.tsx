const NewTodo = () => {
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor='todo-text'>Todo Text</label>
            <input type='text' id='todo-text' />
            <button>Add Todo</button>
        </form>
    );
}

export default NewTodo;
