import { useState } from 'react';
import { useTodos } from '../context/TodoContext';

export function AddTodoForm() {
  const [inputValue, setInputValue] = useState<string>('');
  const { dispatch } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD', payload: inputValue.trim() });
      setInputValue('');
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
