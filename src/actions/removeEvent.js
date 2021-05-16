import { gql } from '@apollo/client';

const removeEvent = gql`
  mutation AddEvent($input: Input) {
    addEvent(input: $input) {
      
    }
  }
`;
