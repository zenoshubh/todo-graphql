import UserModel from "../../../models/user.model";
import type {Context} from "../../../types";


export const queries = {
    
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const user = await UserModel.findById(context.user.id);
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
    
}