import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { AsyncStatus, LastAction } from '../types/todo.types';
import { todoReducer } from '../reducers/todoReducer';
import * as todoApi from '../api/todoApi';
import { TodoContext } from './todoContext';

const successMessages: Record<string, string> = {
  add: 'Zadanie zostało dodane',
  toggle: 'Status zadania zaktualizowany',
  edit: 'Zadanie zostało zaktualizowane',
  delete: 'Zadanie zostało usunięte',
  clear: 'Wszystkie zadania zostały usunięte',
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<LastAction>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const clearMessages = useCallback(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const fetchTodos = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);
    setLastAction('fetch');
    try {
      const data = await todoApi.getTodos();
      if (!isMounted.current) return;
      dispatch({ type: 'SET_TODOS', payload: data });
      setStatus('success');
    } catch (err) {
      if (!isMounted.current) return;
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Nie udało się pobrać zadań',
      );
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- zamierzone ładowanie początkowe z API
    void fetchTodos();
  }, [fetchTodos]);

  const runMutation = useCallback(
    async (
      action: Exclude<LastAction, 'fetch' | null>,
      fn: () => Promise<void>,
    ) => {
      setStatus('loading');
      setErrorMessage(null);
      setSuccessMessage(null);
      setLastAction(action);
      try {
        await fn();
        if (!isMounted.current) return;
        setStatus('success');
        setSuccessMessage(successMessages[action] ?? 'Operacja zakończona');
      } catch (err) {
        if (!isMounted.current) return;
        setStatus('error');
        setErrorMessage(
          err instanceof Error ? err.message : 'Wystąpił błąd operacji',
        );
      }
    },
    [],
  );

  const addTodo = useCallback(
    async (title: string) => {
      await runMutation('add', async () => {
        const todo = await todoApi.createTodo(title);
        dispatch({ type: 'ADD', payload: todo });
      });
    },
    [runMutation],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      await runMutation('toggle', async () => {
        const updated = await todoApi.updateTodo(id, {
          completed: !todo.completed,
        });
        dispatch({ type: 'TOGGLE', payload: updated });
      });
    },
    [todos, runMutation],
  );

  const editTodo = useCallback(
    async (id: string, title: string) => {
      await runMutation('edit', async () => {
        const updated = await todoApi.updateTodo(id, { title });
        dispatch({ type: 'EDIT', payload: updated });
      });
    },
    [runMutation],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      await runMutation('delete', async () => {
        await todoApi.deleteTodo(id);
        dispatch({ type: 'DELETE', payload: id });
      });
    },
    [runMutation],
  );

  const clearAllTodos = useCallback(async () => {
    await runMutation('clear', async () => {
      await todoApi.clearAllTodos();
      dispatch({ type: 'SET_TODOS', payload: [] });
    });
  }, [runMutation]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        status,
        errorMessage,
        successMessage,
        lastAction,
        fetchTodos,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        clearAllTodos,
        clearMessages,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
