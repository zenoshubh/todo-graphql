import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, DELETE_TODO, TOGGLE_TODO, GET_MY_TODOS } from '../../graphql/queries';
import type { Todo, UpdateTodoInput, TodoResponse } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
  });

  const [updateTodo, { loading: updateLoading }] = useMutation<{ updateTodo: TodoResponse }>(UPDATE_TODO, {
    refetchQueries: [{ query: GET_MY_TODOS }],
  });

  const [deleteTodo] = useMutation<{ deleteTodo: TodoResponse }>(DELETE_TODO, {
    refetchQueries: [{ query: GET_MY_TODOS }],
  });

  const [toggleTodo] = useMutation<{ toggleTodo: TodoResponse }>(TOGGLE_TODO, {
    refetchQueries: [{ query: GET_MY_TODOS }],
  });

  const handleToggle = async () => {
    try {
      await toggleTodo({
        variables: { id: todo.id },
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo({
          variables: { id: todo.id },
        });
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editData.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      const updateInput: UpdateTodoInput = {
        id: todo.id,
        title: editData.title.trim(),
        description: editData.description.trim() || undefined,
      };

      await updateTodo({
        variables: { input: updateInput },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-card p-5 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Title</label>
            <Input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full border-border focus-visible:border-primary focus-visible:ring-primary/20"
              placeholder="Todo title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Description (optional)</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 bg-transparent resize-none text-card-foreground"
              rows={2}
              placeholder="Todo description"
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleUpdate}
              disabled={updateLoading}
              className="flex-1"
            >
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card p-5 rounded-lg shadow-md border border-border transition-all duration-200 hover:shadow-lg ${
      todo.completed ? 'bg-accent/30' : ''
    }`}>
      <div className="flex items-start gap-4">
        <div className="mt-1.5">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className={`${
              todo.completed ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary'
            }`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-medium text-card-foreground mb-1.5 ${
            todo.completed ? 'line-through text-muted-foreground' : ''
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-muted-foreground text-sm mb-3 ${
              todo.completed ? 'line-through opacity-70' : ''
            }`}>
              {todo.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              {new Date(todo.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10"
                disabled={todo.completed}
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
