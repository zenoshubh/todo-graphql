import TodoModel from "../models/todo.model";
import mongoose from "mongoose";

interface CreateTodoPayload {
    title: string;
    description?: string;
    userId: string;
}

interface UpdateTodoPayload {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
    userId: string;
}

interface GetTodoPayload {
    id: string;
    userId: string;
}

interface DeleteTodoPayload {
    id: string;
    userId: string;
}

interface ToggleTodoPayload {
    id: string;
    userId: string;
}

class TodoService {
    
    public static async getUserTodos(userId: string) {
        try {
            const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
            return {
                success: true,
                message: "Todos fetched successfully",
                todos
            };
        } catch (error) {
            console.log("Error fetching todos:", error);
            return {
                success: false,
                message: "Error fetching todos",
                todos: []
            };
        }
    }

    public static async getTodoById(payload: GetTodoPayload) {
        const { id, userId } = payload;

        try {
            const todo = await TodoModel.findOne({ _id: id, userId });
            if (!todo) {
                return {
                    success: false,
                    message: "Todo not found",
                    todo: null
                };
            }

            return {
                success: true,
                message: "Todo fetched successfully",
                todo
            };
        } catch (error) {
            console.log("Error fetching todo:", error);
            return {
                success: false,
                message: "Error fetching todo",
                todo: null
            };
        }
    }

    public static async createTodo(payload: CreateTodoPayload) {
        const { title, description, userId } = payload;

        try {
            const todo = await TodoModel.create({
                title,
                description,
                userId
            });

            return {
                success: true,
                message: "Todo created successfully",
                todo
            };
        } catch (error) {
            console.log("Error creating todo:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error creating todo",
                todo: null
            };
        }
    }

    public static async updateTodo(payload: UpdateTodoPayload) {
        const { id, userId, ...updateData } = payload;

        try {
            const todo = await TodoModel.findOneAndUpdate(
                { _id: id, userId },
                updateData,
                { new: true, runValidators: true }
            );

            if (!todo) {
                return {
                    success: false,
                    message: "Todo not found",
                    todo: null
                };
            }

            return {
                success: true,
                message: "Todo updated successfully",
                todo
            };
        } catch (error) {
            console.log("Error updating todo:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error updating todo",
                todo: null
            };
        }
    }

    public static async deleteTodo(payload: DeleteTodoPayload) {
        const { id, userId } = payload;

        try {
            const todo = await TodoModel.findOneAndDelete({ _id: id, userId });

            if (!todo) {
                return {
                    success: false,
                    message: "Todo not found",
                    todo: null
                };
            }

            return {
                success: true,
                message: "Todo deleted successfully",
                todo
            };
        } catch (error) {
            console.log("Error deleting todo:", error);
            return {
                success: false,
                message: "Error deleting todo",
                todo: null
            };
        }
    }

    public static async toggleTodo(payload: ToggleTodoPayload) {
        const { id, userId } = payload;

        try {
            const todo = await TodoModel.findOne({ _id: id, userId });

            if (!todo) {
                return {
                    success: false,
                    message: "Todo not found",
                    todo: null
                };
            }

            todo.completed = !todo.completed;
            await todo.save();

            return {
                success: true,
                message: "Todo status updated successfully",
                todo
            };
        } catch (error) {
            console.log("Error toggling todo:", error);
            return {
                success: false,
                message: "Error toggling todo",
                todo: null
            };
        }
    }
}

export default TodoService;