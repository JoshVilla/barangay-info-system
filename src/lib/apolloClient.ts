import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create an Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql", // The GraphQL endpoint you defined
    credentials: "same-origin", // To send cookies if needed
  }),
  cache: new InMemoryCache(),
});

export default client;
