import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO, GET_MY_TODOS } from '../../graphql/queries';
import type { TodoInput, TodoResponse } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AddTodo: React.FC = () => {
  const [formData, setFormData] = useState<TodoInput>({
    title: '',
    description: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [createTodo, { loading }] = useMutation<{ createTodo: TodoResponse }>(CREATE_TODO, {
    refetchQueries: [{ query: GET_MY_TODOS }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const { data } = await createTodo({
        variables: { 
          input: {
            title: formData.title.trim(),
            description: formData?.description?.trim() || undefined,
          }
        },
      });

      if (data?.createTodo.success) {
        setFormData({ title: '', description: '' });
        setIsOpen(false);
      } else {
        setError(data?.createTodo.message || 'Failed to create todo');
      }
    } catch (err) {
      setError('An error occurred while creating the todo');
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full py-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Task
      </Button>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-card-foreground">Add New Task</h3>
        <Button
          variant="ghost" 
          size="sm"
          onClick={() => {
            setIsOpen(false);
            setFormData({ title: '', description: '' });
            setError('');
          }}
          className="text-muted-foreground hover:text-card-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
            Title <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border-border focus-visible:border-primary focus-visible:ring-primary/20"
            placeholder="What needs to be done?"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 bg-transparent resize-none text-card-foreground"
            placeholder="Add some details (optional)"
          />
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-5"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                Creating...
              </>
            ) : (
              'Add Task'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
