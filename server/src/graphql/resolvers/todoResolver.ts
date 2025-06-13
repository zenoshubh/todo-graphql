import TodoModel from "../../models/todo.model";
import type { Context } from "../../types";

const queries = {
    myTodos: async (_: any, __: any, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todos: []
            };
        }

        try {
            const todos = await TodoModel.find({ userId: context.user.id }).sort({ createdAt: -1 });
            return {
                success: true,
                message: "Todos fetched successfully",
                todos
            };
        } catch (error) {
            return {
                success: false,
                message: "Error fetching todos",
                todos: []
            };
        }
    },

    getTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        try {
            const todo = await TodoModel.findOne({ _id: id, userId: context.user.id });
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
            return {
                success: false,
                message: "Error fetching todo",
                todo: null
            };
        }
    }
}

const mutations = {
    createTodo: async (_: any, { input }: { input: { title: string; description?: string } }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        try {
            const todo = await TodoModel.create({
                title: input.title,
                description: input.description,
                userId: context.user.id
            });

            return {
                success: true,
                message: "Todo created successfully",
                todo
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || "Error creating todo",
                todo: null
            };
        }
    },

    updateTodo: async (_: any, { input }: { input: { id: string; title?: string; description?: string; completed?: boolean } }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        try {
            const todo = await TodoModel.findOneAndUpdate(
                { _id: input.id, userId: context.user.id },
                { ...input },
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
        } catch (error: any) {
            return {
                success: false,
                message: error.message || "Error updating todo",
                todo: null
            };
        }
    },

    deleteTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        try {
            const todo = await TodoModel.findOneAndDelete({ _id: id, userId: context.user.id });

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
        } catch (error: any) {
            return {
                success: false,
                message: "Error deleting todo",
                todo: null
            };
        }
    },

    toggleTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        try {
            const todo = await TodoModel.findOne({ _id: id, userId: context.user.id });

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
        } catch (error: any) {
            return {
                success: false,
                message: "Error toggling todo",
                todo: null
            };
        }
    }
}

export const todoResolver = { queries, mutations };