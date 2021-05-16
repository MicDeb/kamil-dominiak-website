import { gql } from '@apollo/client';

const updateEvent = gql`
  mutation AddEvent($input: Input) {
    addEvent(input: $input) {
      
    }
  }
`;
