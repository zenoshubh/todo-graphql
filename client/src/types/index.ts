export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface TodoResponse {
  success: boolean;
  message: string;
  todo?: Todo;
}

export interface TodosResponse {
  success: boolean;
  message: string;
  todos: Todo[];
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface TodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}
