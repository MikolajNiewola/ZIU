import { useState } from 'react';
import type { Todo } from '../types/todo.types';
import { useTodos } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE', payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE', payload: todo.id });
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      dispatch({
        type: 'EDIT',
        payload: { id: todo.id, title: editTitle.trim() },
      });
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="todo-item">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span className="checkmark"></span>
        </label>
        
        <span 
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
        
        <div className="todo-actions">
          <button 
            className="action-btn edit" 
            onClick={() => setIsEditing(true)}
            aria-label="Edit"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button 
            className="action-btn delete" 
            onClick={handleDelete}
            aria-label="Delete"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <input
              autoFocus
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
            />
            <div className="modal-actions">
              <button 
                className="modal-btn cancel" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn save" 
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
