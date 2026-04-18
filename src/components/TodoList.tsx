import { type Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoListTailwind({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">
        Brak zadań. Dodaj pierwsze!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center gap-3 px-4 py-3 ${todo.completed ? "bg-gray-50" : "bg-white"}`}
        >
          {/* TODO 6: Dodaj <input type='checkbox'> z klasami Tailwind */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded text-brand-500 focus:ring-2 focus:ring-brand-500 border-gray-300"
          />
          {/* TODO 7: Dodaj <span> z tekstem, przekreślonym gdy completed */}
          <span
            className={`flex-1 text-gray-700 ${todo.completed ? "line-through" : ""}`}
          >
            {todo.title}
          </span>
          {/* TODO 8: Dodaj przycisk usuwania po prawej stronie */}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-red-600 transition-colors"
            aria-label="Usuń zadanie"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
