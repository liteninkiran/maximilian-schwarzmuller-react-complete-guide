import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
    const [todoItems, setTodoItems] = useState<Todo[]>([]);
    const addTodoHandler = (text: string): void => setTodoItems(prev => prev.concat(new Todo(text)));
    const removeTodoHandler = (id: string) => setTodoItems(prev => prev.filter(todo => todo.id !== id));

    return (
        <div>
            <NewTodo onAddTodo={addTodoHandler} />
            <Todos items={todoItems} onRemoveTodo={removeTodoHandler} />
        </div>
    );
}

export default App;
