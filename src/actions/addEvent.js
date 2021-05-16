import { gql } from '@apollo/client';

const addEvent = gql`
  mutation AddEvent($input: Input) {
    addEvent(input: $input) {
      
    }
  }
`;
