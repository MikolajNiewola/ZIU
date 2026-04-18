import type { Todo, TodoAction } from '../types/todo.types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload,
          completed: false,
          createdAt: new Date(),
        },
        ...state,
      ];
    case 'TOGGLE':
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload);
    case 'EDIT':
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, title: action.payload.title } : t
      );
    default:
      return state;
  }
}
