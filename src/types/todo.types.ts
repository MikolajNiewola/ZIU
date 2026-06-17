export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD'; payload: Todo }
  | { type: 'TOGGLE'; payload: Todo }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: Todo };

export type LastAction =
  | 'fetch'
  | 'add'
  | 'toggle'
  | 'edit'
  | 'delete'
  | 'clear'
  | null;
