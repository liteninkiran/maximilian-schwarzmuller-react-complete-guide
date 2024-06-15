import Todos from './components/Todos';

function App() {
    const items = [
        'Learn React',
        'Learn TypeScript',
    ];
    return (
        <div>
            <Todos items={items} />
        </div>
    );
}

export default App;
