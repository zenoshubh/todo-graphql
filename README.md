# TodoWit - A GraphQL-powered Todo Application

<p align="center">
  <a href="https://ibb.co/CpspDn1v"><img src="https://i.ibb.co/TDqDdHvR/Screenshot-2025-06-13-212433.png" alt="Screenshot-2025-06-13-212433" border="0"></a>
</p>

TodoWit is a modern, full-stack todo application built with GraphQL, React, TypeScript, and MongoDB. It features a clean, responsive UI with a beautiful turquoise theme and provides a seamless experience for managing your tasks.

## 📋 Features

- **User Authentication**: Secure registration and login system
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by completion status
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: GraphQL-powered data synchronization
- **Modern UI**: Clean, accessible interface with a consistent color theme

## 🚀 Tech Stack

### Frontend

- **React 18+**: Component-based UI library
- **TypeScript**: Static typing for better development experience
- **Apollo Client**: GraphQL client for React
- **TailwindCSS**: Utility-first CSS framework
- **ShadCN UI**: Unstyled, accessible UI components
- **Lucide Icons**: Beautiful, consistent icon set
- **React Hook Form**: Form validation and submission
- **Zod**: TypeScript-first schema validation

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Apollo Server**: GraphQL server
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication using JSON Web Tokens
- **bcrypt**: Password hashing

## 🏗️ Architecture

The application follows a modern architecture with a clear separation of concerns:

### Client-side Architecture

- **Components**: Reusable UI components (forms, buttons, dialogs)
- **Context**: State management for authentication
- **GraphQL**: Queries and mutations for data fetching
- **Types**: TypeScript interfaces for type safety

### Server-side Architecture

- **GraphQL Schema**: Defines the API structure
- **Resolvers**: Handle GraphQL operations
- **Models**: MongoDB schemas
- **Services**: Business logic layer
- **Utils**: Helper functions for authentication

## 🛠️ Installation and Setup

### Prerequisites

- Bun (v1.0 or later)
- MongoDB (local or Atlas)
- Git

### Server Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Todo-GraphQL.git
   cd Todo-GraphQL/server
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT= 8000
   DATABASE_URL= "your_mongodb_connection_string_with_database_name"
   JWT_SECRET= your_jwt_secret_key
   JWT_EXPIRATION= jwt_expiration_time
   ```

4. Start the server:
   ```bash
   bun run dev
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file in the client directory:
   ```
   VITE_API_URI= "http://localhost:8000"
   ```

4. Start the client:
   ```bash
   bun run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 API Documentation

### GraphQL Endpoints

The GraphQL API is available at `http://localhost:8000` and provides the following operations:

#### Queries

- `me`: Get the current authenticated user
- `myTodos`: Get all todos for the current user
- `getTodo(id: ID!)`: Get a specific todo by ID

#### Mutations

- `register(input: RegisterInput!)`: Register a new user
- `login(input: LoginInput!)`: Login a user
- `createTodo(input: TodoInput!)`: Create a new todo
- `updateTodo(input: UpdateTodoInput!)`: Update a todo
- `deleteTodo(id: ID!)`: Delete a todo
- `toggleTodo(id: ID!)`: Toggle the completion status of a todo

## 📱 Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Create Todos**: Add new tasks with title and optional description
3. **Manage Todos**: Mark tasks as completed, edit, or delete them
4. **Filter Todos**: Use the filter buttons to view all, active, or completed tasks

## 🔒 Security

- Password hashing with bcrypt
- JWT-based authentication
- Protected GraphQL resolvers
- Input validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Bun Documentation](https://bun.sh/docs)

## 👤 Author

**Shubh Verma**
- GitHub: [@zenoshubh](https://github.com/zenoshubh)
- Twitter: [@zenoshubh](https://twitter.com/zenoshubh)
- LinkedIn: [@zenoshubh](https://linkedin.com/in/zenoshubh)
- Email: [zenoshubh@gmail.com](mailto:zenoshubh@gmail.com)