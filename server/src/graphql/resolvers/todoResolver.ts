import TodoService from "../../services/todo";
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

        return await TodoService.getUserTodos(context.user.id);
    },

    getTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        return await TodoService.getTodoById({ id, userId: context.user.id });
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

        return await TodoService.createTodo({
            title: input.title,
            description: input.description,
            userId: context.user.id
        });
    },

    updateTodo: async (_: any, { input }: { input: { id: string; title?: string; description?: string; completed?: boolean } }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        return await TodoService.updateTodo({
            ...input,
            userId: context.user.id
        });
    },

    deleteTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        return await TodoService.deleteTodo({ id, userId: context.user.id });
    },

    toggleTodo: async (_: any, { id }: { id: string }, context: Context) => {
        if (!context.user) {
            return {
                success: false,
                message: "Authentication required",
                todo: null
            };
        }

        return await TodoService.toggleTodo({ id, userId: context.user.id });
    }
}

export const todoResolver = { queries, mutations };