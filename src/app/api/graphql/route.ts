import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  fetchAPI: { Response },
});

export { yoga as GET, yoga as POST };
