import type { Todo, TodoAction } from '../types/todo.types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'TOGGLE':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload);
    case 'EDIT':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    default:
      return state;
  }
}
