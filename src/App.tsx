import { useState } from 'react';
import { useTodos } from './context/TodoContext';
import type { FilterType } from './types/todo.types';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';

function App() {
  const { todos } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const activeCount = todos.filter((t) => !t.completed).length;
  const totalCount = todos.length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div className="app-container">
      <h1>To-Do</h1>
      <AddTodoForm />
      <FilterBar 
        activeFilter={filter} 
        onFilterChange={setFilter} 
        activeCount={activeCount}
        totalCount={totalCount}
      />
      <TodoList todos={filteredTodos} />
    </div>
  );
}

export default App;
