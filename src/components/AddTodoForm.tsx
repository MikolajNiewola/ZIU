import { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInputTailwind({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form
      role="search"
      aria-label="Dodaj nowe zadanie"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Dodaj nowe zadanie
      </h2>

      <div className="flex gap-2">
        <label htmlFor="new-task-input" className="visually-hidden">
          Treść nowego zadania
        </label>
        <input
          id="new-task-input"
          type="text"
          placeholder="Wpisz treść zadania..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-required="true"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />

        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Dodaj zadanie"
          className="px-5 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg
                    hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Dodaj
        </button>
      </div>
    </form>
  );
}
