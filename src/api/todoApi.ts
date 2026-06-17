import type { Todo } from '../types/todo.types';

interface ApiError {
  message: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = (await response.json().catch(() => ({
      message: 'Wystąpił nieoczekiwany błąd sieci',
    }))) as ApiError;
    throw new Error(error.message || 'Wystąpił nieoczekiwany błąd sieci');
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('/api/todos');
  return handleResponse<Todo[]>(response);
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return handleResponse<Todo>(response);
}

export async function updateTodo(
  id: string,
  data: { title?: string; completed?: boolean },
): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Todo>(response);
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  return handleResponse<void>(response);
}

export async function clearAllTodos(): Promise<void> {
  const response = await fetch('/api/todos', { method: 'DELETE' });
  return handleResponse<void>(response);
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  categories: { value: string }[];
  notifications: { email: boolean; push: boolean };
  newsletter: boolean;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<{ message: string; email?: string }> {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}
