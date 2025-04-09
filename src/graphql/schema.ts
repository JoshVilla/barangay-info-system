import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Resident {
    id: ID!
    firstname: String!
    middlename: String!
    lastname: String!
    age: Int!
    birthdate: String!
    nationality: String!
  }

  # Define the filter input type
  input ResidentFilter {
    firstname: String
    middlename: String
    lastname: String
  }

  type Query {
    residents(filter: ResidentFilter): [Resident!]!
  }
`;
