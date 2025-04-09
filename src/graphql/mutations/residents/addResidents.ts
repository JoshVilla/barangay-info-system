import { gql } from "@apollo/client";

export const ADD_RESIDENT = gql`
  mutation AddResident($input: AddResidentInput!) {
    addResident(input: $input) {
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
