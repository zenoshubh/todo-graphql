import TodoModel from "../../../models/todo.model";
import type {Context} from "../../../types";


export const queries = {

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