import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgress, Box } from '@mui/material';
import { useTodos } from './hooks/useTodos';
import type { FilterType } from './types/todo.types';
import AddTodoForm from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import TodoList from './components/TodoList';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MultiStepForm from './components/form/MultiStepForm';
import DashboardView from './components/views/DashboardView';
import SettingsView from './components/views/SettingsView';
import NetworkErrorBanner from './components/NetworkErrorBanner';
import StatusSnackbar from './components/StatusSnackbar';
import { pageVariants } from './animations/variants';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/todos': 'Zadania',
  '/register': 'Rejestracja',
  '/settings': 'Ustawienia',
};

function App() {
  const {
    todos,
    status,
    errorMessage,
    successMessage,
    lastAction,
    fetchTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearMessages,
  } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState('/');

  const activeCount = todos.filter((t) => !t.completed).length;
  const totalCount = todos.length;
  const isInitialLoading = status === 'loading' && lastAction === 'fetch' && todos.length === 0;
  const isMutating = status === 'loading' && lastAction !== 'fetch';

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const renderContent = () => {
    switch (currentPage) {
      case '/register':
        return <MultiStepForm />;
      case '/settings':
        return <SettingsView />;
      case '/todos':
        return (
          <section
            aria-labelledby="add-todo-heading"
            className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            {status === 'error' && lastAction === 'fetch' && errorMessage && (
              <NetworkErrorBanner message={errorMessage} onRetry={fetchTodos} />
            )}

            {status === 'error' && lastAction !== 'fetch' && errorMessage && (
              <NetworkErrorBanner
                message={errorMessage}
                onRetry={() => {
                  clearMessages();
                  fetchTodos();
                }}
              />
            )}

            <AddTodoForm onAdd={addTodo} isLoading={isMutating} />
            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              totalCount={totalCount}
            />
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isLoading={isInitialLoading}
            />
          </section>
        );
      case '/':
      default:
        return <DashboardView onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <DashboardLayout
        onNavigate={setCurrentPage}
        activePage={currentPage}
        pageTitle={pageTitles[currentPage] ?? 'TodoApp'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </DashboardLayout>

      <StatusSnackbar successMessage={successMessage} onClose={clearMessages} />

      {isMutating && currentPage === '/todos' && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            zIndex: 1300,
          }}
          role="status"
          aria-label="Trwa zapisywanie"
        >
          <CircularProgress size={28} />
        </Box>
      )}
    </>
  );
}

export default App;
