import { gql, useQuery } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      eventStartDate
      eventStartTime
      eventEndDate
      eventPlace
      eventName
      eventDescription
      eventLink
      eventRole
    }
  }
`;

export const getEvents = () => (
  useQuery(GET_EVENTS)
);
