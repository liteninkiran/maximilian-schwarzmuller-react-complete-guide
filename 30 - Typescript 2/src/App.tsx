import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
    const todoItems = [
        new Todo('Learn React'),
        new Todo('Learn TypeScript'),
    ];

    return (
        <div>
            <Todos items={todoItems} />
        </div>
    );
}

export default App;
