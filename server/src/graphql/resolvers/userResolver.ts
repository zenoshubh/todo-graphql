import UserService from "../../services/user";
import type { Context } from "../../types";

const queries = {
  me: async (_: any, __: any, context: Context) => {
    if (!context.user) {
      throw new Error('Authentication required');
    }

    return await UserService.getUserById(context.user.id);
  },
}

const mutations = {
  register: async (_: any, { input }: { input: { name: string; email: string; password: string } }) => {
    return await UserService.createUser(input);
  },

  login: async (_: any, { input }: { input: { email: string; password: string } }) => {
    return await UserService.authenticateUser(input);
  },
}

export const userResolver = { queries, mutations };