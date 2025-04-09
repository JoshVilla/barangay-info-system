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

  input ResidentFilter {
    firstname: String
    middlename: String
    lastname: String
  }

  input AddResidentInput {
    firstname: String!
    middlename: String!
    lastname: String!
    age: Int!
    birthdate: String!
    nationality: String!
  }

  type Query {
    residents(filter: ResidentFilter): [Resident!]!
  }

  type Mutation {
    addResident(input: AddResidentInput!): Resident!
  }
`;
