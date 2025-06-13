import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      createdAt
    }
  }
`;

export const GET_MY_TODOS = gql`
  query GetMyTodos {
    myTodos {
      success
      message
      todos {
        id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
      token
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      token
      user {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      success
      message
      todo {
        id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      success
      message
      todo {
        id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      success
      message
      todo {
        id
      }
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      success
      message
      todo {
        id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;
