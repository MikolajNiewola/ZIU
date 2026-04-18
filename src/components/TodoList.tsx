import { motion, AnimatePresence } from 'framer-motion';
import type { Todo } from '../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <div className="empty-state">No tasks found. Enjoy your day!</div>;
  }

  return (
    <ul className="todo-list">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
          >
            <TodoItem todo={todo} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
