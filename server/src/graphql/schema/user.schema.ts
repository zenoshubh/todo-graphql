export const userSchema = `#graphql
  # User type definition
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  # Authentication response types
  type AuthResponse {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  # Input types
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    # Get current user info (requires authentication)
    me: User
  }

  type Mutation {
    # Authentication mutations
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
  }
`;