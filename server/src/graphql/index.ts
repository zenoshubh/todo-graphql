import { ApolloServer } from "@apollo/server";
import { userSchema } from "./schema/user.schema";
import { todoSchema } from "./schema/todo.schema";
import { userResolver } from "./resolvers/userResolver";
import { todoResolver } from "./resolvers/todoResolver";

export const server = new ApolloServer({

    typeDefs: `#graphql
    ${userSchema}
    ${todoSchema}
    `,

    resolvers: {
        Query: {
            ...userResolver.queries,
            ...todoResolver.queries
        },
        Mutation: {
            ...userResolver.mutations,
            ...todoResolver.mutations
        }
    }

})