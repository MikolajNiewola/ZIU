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
    <div className="task-grid mt-6">
      {todos.map((todo) => (
        <div key={todo.id} className="card-wrapper">
          <div className="task-card">
            <div className="task-card__thumbnail"></div>
            
            <div className="flex-1 p-4 flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5 rounded text-brand-500 focus:ring-2 focus:ring-brand-500 border-gray-300 shrink-0"
              />
              
              <span
                className={`flex-1 text-gray-700 font-medium ${todo.completed ? "line-through opacity-60" : ""}`}
              >
                {todo.title}
              </span>
              
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
