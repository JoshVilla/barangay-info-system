import { gql } from "@apollo/client";

export const ADD_RESIDENT = gql`
  mutation AddResident($input: AddResidentInput!) {
    addResident(input: $input) {
      message
      resident {
        id
        firstname
        lastname
        middlename
        age
        birthdate
        nationality
        civilStatus
        religion
        contactNumber
        email
        fatherName
        motherName
        spouseName
        numberOfChildren
      }
    }
  }
`;
``;
