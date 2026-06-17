import { createContext } from 'react';
import type { AsyncStatus, LastAction, Todo } from '../types/todo.types';

export interface TodoContextType {
  todos: Todo[];
  status: AsyncStatus;
  errorMessage: string | null;
  successMessage: string | null;
  lastAction: LastAction;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearAllTodos: () => Promise<void>;
  clearMessages: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);
