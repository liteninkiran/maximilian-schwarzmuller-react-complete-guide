import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
    const [todoItems, setTodoItems] = useState<Todo[]>([]);
    const addTodoHandler = (text: string): void => setTodoItems(prev => prev.concat(new Todo(text)));

    return (
        <div>
            <NewTodo onAddTodo={addTodoHandler} />
            <Todos items={todoItems} />
        </div>
    );
}

export default App;
