import { http, HttpResponse, delay } from 'msw';
import type { Todo } from '../types/todo.types';
import {
  loadTodos,
  saveTodos,
  isSimulateErrorEnabled,
} from './data';

function shouldSimulateError(request: Request): boolean {
  return (
    isSimulateErrorEnabled() ||
    request.headers.get('X-Simulate-Error') === '1'
  );
}

export const handlers = [
  http.get('/api/todos', async ({ request }) => {
    await delay(400);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd sieci — nie udało się pobrać zadań' },
        { status: 503 },
      );
    }
    return HttpResponse.json(loadTodos());
  }),

  http.post('/api/todos', async ({ request }) => {
    await delay(400);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd sieci — nie udało się dodać zadania' },
        { status: 503 },
      );
    }
    const body = (await request.json()) as { title?: string };
    const title = body.title?.trim();
    if (!title) {
      return HttpResponse.json(
        { message: 'Tytuł zadania jest wymagany' },
        { status: 400 },
      );
    }
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const todos = [todo, ...loadTodos()];
    saveTodos(todos);
    return HttpResponse.json(todo, { status: 201 });
  }),

  http.put('/api/todos/:id', async ({ request, params }) => {
    await delay(400);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd sieci — nie udało się zaktualizować zadania' },
        { status: 503 },
      );
    }
    const body = (await request.json()) as {
      title?: string;
      completed?: boolean;
    };
    const todos = loadTodos();
    const index = todos.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Zadanie nie znalezione' },
        { status: 404 },
      );
    }
    const updated: Todo = {
      ...todos[index],
      ...(body.title !== undefined ? { title: body.title.trim() } : {}),
      ...(body.completed !== undefined ? { completed: body.completed } : {}),
    };
    todos[index] = updated;
    saveTodos(todos);
    return HttpResponse.json(updated);
  }),

  http.delete('/api/todos/:id', async ({ request, params }) => {
    await delay(400);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd sieci — nie udało się usunąć zadania' },
        { status: 503 },
      );
    }
    const todos = loadTodos();
    const filtered = todos.filter((t) => t.id !== params.id);
    if (filtered.length === todos.length) {
      return HttpResponse.json(
        { message: 'Zadanie nie znalezione' },
        { status: 404 },
      );
    }
    saveTodos(filtered);
    return new HttpResponse(null, { status: 204 });
  }),

  http.delete('/api/todos', async ({ request }) => {
    await delay(400);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd sieci — nie udało się wyczyścić zadań' },
        { status: 503 },
      );
    }
    saveTodos([]);
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/register', async ({ request }) => {
    await delay(1500);
    if (shouldSimulateError(request)) {
      return HttpResponse.json(
        { message: 'Błąd serwera, spróbuj ponownie' },
        { status: 500 },
      );
    }
    const body = (await request.json()) as { email?: string };
    const rand = Math.random();
    if (rand < 0.15) {
      return HttpResponse.json(
        { message: 'Ten adres e-mail jest już zarejestrowany' },
        { status: 409 },
      );
    }
    if (rand < 0.25) {
      return HttpResponse.json(
        { message: 'Błąd serwera, spróbuj ponownie' },
        { status: 500 },
      );
    }
    return HttpResponse.json(
      { message: 'Rejestracja zakończona', email: body.email },
      { status: 201 },
    );
  }),
];
