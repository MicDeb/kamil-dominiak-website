// update-testimonial.js

const query = require('./utils/query');

const UPDATE_EVENT = `
    mutation(
      $id: ID!,
      $eventStartDate: String!
      $eventStartTime: String
      $eventEndDate: String
      $eventPlace: String
      $eventName: String
      $eventDescription: String
      $eventLink: String
      $eventRole: String
    ){
        updateEvent(
          id: $id,
          data: {
            eventStartDate: $eventStartDate
            eventStartTime: $eventStartTime
            eventEndDate: $eventEndDate
            eventPlace: $eventPlace
            eventName: $eventName
            eventDescription: $eventDescription
            eventLink: $eventLink
            eventRole: $eventRole
          }
        ){
            _id
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

exports.handler = async (event) => {
  const formData = JSON.parse(event.body);
  const { data, errors } = await query(
    UPDATE_EVENT, formData,
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      updatedEvent:
      data.updateEvent,
    }),
  };
};
