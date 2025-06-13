export const typeDefs = `#graphql

# Todo type definition
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }

  # Todo response types
  type TodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
  }

  type TodosResponse {
    success: Boolean!
    message: String!
    todos: [Todo!]
  }

  #Input types for creating and updating todos

  input TodoInput {
    title: String!
    description: String
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    completed: Boolean
  }

  type Query {
     # Get user's todos (requires authentication)
    myTodos: TodosResponse!

    # Get a specific todo (requires authentication)
    getTodo(id: ID!): TodoResponse!
  }

  type Mutation {
    # Todo mutations (all require authentication)
    createTodo(input: TodoInput!): TodoResponse!
    updateTodo(input: UpdateTodoInput!): TodoResponse!
    deleteTodo(id: ID!): TodoResponse!
    toggleTodo(id: ID!): TodoResponse!
  }


`