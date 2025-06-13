import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_TODOS } from '../../graphql/queries';
import type { TodosResponse } from '../../types';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Button } from '../ui/button';

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { data, loading, error } = useQuery<{ myTodos: TodosResponse }>(GET_MY_TODOS);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading todos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
        Error loading todos: {error.message}
      </div>
    );
  }

  const todos = data?.myTodos.todos || [];
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-6">My Tasks</h1>
      
      <AddTodo />
      
      {todos.length > 0 && (
        <>
          {/* Stats */}
          <div className="bg-card p-4 rounded-lg shadow-md border border-border">
            <div className="flex items-center justify-between">
              <div className="flex gap-6 text-sm">
                <span className="text-muted-foreground">
                  Total: <span className="font-semibold text-card-foreground">{stats.total}</span>
                </span>
                <span className="text-muted-foreground">
                  Active: <span className="font-semibold text-chart-4">{stats.active}</span>
                </span>
                <span className="text-muted-foreground">
                  Completed: <span className="font-semibold text-chart-2">{stats.completed}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map((filterType) => (
              <Button
                key={filterType}
                onClick={() => setFilter(filterType)}
                variant={filter === filterType ? "default" : "outline"}
                className={`transition-colors duration-200`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                <span className="ml-1 text-xs font-normal">
                  {filterType === 'all' && `(${stats.total})`}
                  {filterType === 'active' && `(${stats.active})`}
                  {filterType === 'completed' && `(${stats.completed})`}
                </span>
              </Button>
            ))}
          </div>

          {/* Todo items */}
          <div className="space-y-3">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border shadow-sm">
                {filter === 'all' && 'No todos yet. Add one above!'}
                {filter === 'active' && 'No active todos. Great job!'}
                {filter === 'completed' && 'No completed todos yet.'}
              </div>
            )}
          </div>
        </>
      )}

      {todos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border shadow-md">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-card-foreground mb-2">No todos yet</h3>
          <p>Add your first todo using the form above to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
