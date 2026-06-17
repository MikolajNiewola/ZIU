import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgress, Box } from '@mui/material';
import { type Todo } from '../types/todo.types';
import ModalDialog from './ModalDialog';
import { editTodoSchema, type EditTodoData } from './form/todoSchemas';
import { listItemVariants, tapScale } from '../animations/variants';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, title: string) => Promise<void>;
  isLoading?: boolean;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
}: TodoListProps) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditTodoData>({
    resolver: zodResolver(editTodoSchema),
    defaultValues: { title: '' },
    mode: 'onBlur',
  });

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    reset({ title: todo.title });
  };

  const closeEdit = () => {
    setEditingTodo(null);
    reset({ title: '' });
  };

  const onEditSubmit = async (data: EditTodoData) => {
    if (!editingTodo) return;
    await onEdit(editingTodo.id, data.title.trim());
    closeEdit();
  };

  if (isLoading && todos.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }} role="status" aria-label="Ładowanie zadań">
        <CircularProgress />
      </Box>
    );
  }

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-8" role="status">
        Brak zadań. Dodaj pierwsze!
      </p>
    );
  }

  return (
    <>
      <section aria-label="Lista zadań" className="task-grid mt-6">
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <motion.article
              key={todo.id}
              layout
              variants={listItemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="card-wrapper"
              aria-label={`Zadanie: ${todo.title}`}
            >
              <div className="task-card">
                <div className="task-card__thumbnail" aria-hidden="true" />

                <div className="flex-1 p-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    aria-label={`Oznacz "${todo.title}" jako ${todo.completed ? 'nieukończone' : 'ukończone'}`}
                    className="w-5 h-5 rounded text-brand-500 focus:ring-2 focus:ring-brand-500 border-gray-300 shrink-0"
                  />

                  <span
                    className={`flex-1 text-gray-800 font-medium ${todo.completed ? 'line-through text-gray-600' : ''}`}
                  >
                    {todo.title}
                  </span>

                  <div className="flex gap-1 shrink-0">
                    <motion.button
                      type="button"
                      whileTap={tapScale}
                      onClick={() => openEdit(todo)}
                      className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-brand-500 transition-colors
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      aria-label={`Edytuj zadanie "${todo.title}"`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={tapScale}
                      onClick={() => onDelete(todo.id)}
                      className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      aria-label={`Usuń zadanie "${todo.title}"`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>

      <ModalDialog
        isOpen={!!editingTodo}
        onClose={closeEdit}
        title="Edytuj zadanie"
        hideFooter
      >
        <form onSubmit={handleSubmit(onEditSubmit)} noValidate>
          <label htmlFor="edit-task-input" className="block text-sm font-medium text-gray-700 mb-1">
            Treść zadania
          </label>
          <input
            id="edit-task-input"
            type="text"
            autoFocus
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'edit-title-error' : undefined}
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            {...register('title')}
          />
          {errors.title && (
            <p id="edit-title-error" role="alert" className="text-red-600 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={closeEdit}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              Anuluj
            </motion.button>
            <motion.button
              type="submit"
              whileTap={tapScale}
              disabled={isSubmitting}
              className="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-700
                        disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {isSubmitting ? 'Zapisywanie…' : 'Zapisz'}
            </motion.button>
          </div>
        </form>
      </ModalDialog>
    </>
  );
}
