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
    gender: String!
    suffix: String!
    civilStatus: String!
    religion: String!
    contactNumber: String!
    email: String!
    fatherName: String!
    motherName: String!
    spouseName: String!
    numberOfChildren: Int!
  }

  input ResidentFilter {
    firstname: String
    middlename: String
    lastname: String
  }

  type AddResidentResponse {
    message: String!
    resident: Resident!
  }

  input ResidentInput {
    id: String #optional
    firstname: String!
    middlename: String!
    lastname: String!
    age: Int!
    birthdate: String!
    nationality: String!
    gender: String!
    suffix: String
    civilStatus: String!
    religion: String!
    contactNumber: String!
    email: String!
    fatherName: String!
    motherName: String!
    spouseName: String!
    numberOfChildren: Int!
  }

  type DeleteResidentResponse {
    message: String!
  }

  type EditResidentResponse {
    message: String!
  }

  type Query {
    residents(filter: ResidentFilter): [Resident!]!
  }

  type Mutation {
    addResident(input: ResidentInput!): AddResidentResponse!
    deleteResident(id: ID!): DeleteResidentResponse!
    editResident(input: ResidentInput!): EditResidentResponse!
  }
`;
