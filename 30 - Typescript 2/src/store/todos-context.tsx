import React, { useState } from 'react';
import Todo from '../models/todo';

type TodoContextObj = {
    todos: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodoContextObj>({
    todos: [],
    addTodo: (text: string) => {},
    removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
    const [todoItems, setTodoItems] = useState<Todo[]>([]);
    const addTodoHandler = (text: string) => setTodoItems(prev => prev.concat(new Todo(text)));
    const removeTodoHandler = (id: string) => setTodoItems(prev => prev.filter(todo => todo.id !== id));
    const contextValue: TodoContextObj = {
        todos: todoItems,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    }
    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
