import { gql } from "@apollo/client";

// Define the query to get residents with optional filters
export const GET_RESIDENTS = gql`
  query GetResidents($filter: ResidentFilter) {
    residents(filter: $filter) {
      id
      firstname
      middlename
      lastname
      age
      birthdate
      nationality
    }
  }
`;
