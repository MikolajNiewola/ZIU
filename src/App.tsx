import { useState } from 'react';
import { useTodos } from './context/TodoContext';
import type { FilterType } from './types/todo.types';
import AddTodoForm from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import TodoList from './components/TodoList';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MultiStepForm from './components/form/MultiStepForm';

function App() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState('/');

  const activeCount = todos.filter((t) => !t.completed).length;
  const totalCount = todos.length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const renderContent = () => {
    switch (currentPage) {
      case '/register':
        return <MultiStepForm />;
      case '/todos':
      default:
        return (
          <section
            aria-labelledby="todo-section-title"
            className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 id="todo-section-title" className="visually-hidden">
              Lista zadań
            </h2>
            <AddTodoForm onAdd={(title) => dispatch({ type: 'ADD', payload: title })} />
            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              totalCount={totalCount}
            />
            <TodoList
              todos={filteredTodos}
              onToggle={(id) => dispatch({ type: 'TOGGLE', payload: id })}
              onDelete={(id) => dispatch({ type: 'DELETE', payload: id })}
            />
          </section>
        );
    }
  };

  return (
    <>
      {/* Skip navigation link (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <DashboardLayout onNavigate={setCurrentPage} activePage={currentPage}>
        {renderContent()}
      </DashboardLayout>
    </>
  );
}

export default App;
