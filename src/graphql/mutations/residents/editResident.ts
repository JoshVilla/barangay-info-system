import { gql } from "@apollo/client";

export const EDIT_RESIDENT = gql`
  mutation EditResident($input: ResidentInput!) {
    editResident(input: $input) {
      message
    }
  }
`;
