import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Todo, TodoAction } from '../types/todo.types';
import { todoReducer } from '../reducers/todoReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContextType {
  todos: Todo[];
  dispatch: (action: TodoAction) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  
  // Initialize reducer with stored data
  const [todos, dispatch] = useReducer(todoReducer, storedTodos);

  // Sync state with local storage whenever it changes
  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return ctx;
}
