import { gql } from "@apollo/client";

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
