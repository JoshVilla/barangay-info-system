import { gql } from "@apollo/client";

export const DELETE_RESIDENT = gql`
  mutation DeleteResident($id: ID!) {
    deleteResident(id: $id) {
      message
    }
  }
`;
