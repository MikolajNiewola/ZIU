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
    return true; // 'all'
  });

  const renderContent = () => {
    switch (currentPage) {
      case '/register':
        return <MultiStepForm />;
      case '/todos':
      default:
        return (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
          </div>
        );
    }
  };

  return (
    <DashboardLayout onNavigate={setCurrentPage} activePage={currentPage}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
