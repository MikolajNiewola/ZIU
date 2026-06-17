const STORAGE_KEY = 'msw-todos';
const SIMULATE_ERROR_KEY = 'simulate-network-error';

export function isSimulateErrorEnabled(): boolean {
  return localStorage.getItem(SIMULATE_ERROR_KEY) === 'true';
}

export function setSimulateError(enabled: boolean): void {
  localStorage.setItem(SIMULATE_ERROR_KEY, String(enabled));
}

export function loadTodos(): import('../types/todo.types').Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as import('../types/todo.types').Todo[]) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: import('../types/todo.types').Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export { STORAGE_KEY };
