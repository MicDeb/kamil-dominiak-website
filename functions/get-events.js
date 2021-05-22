// get-events.js

const query = require('./utils/query');

const GET_EVENTS = `
  query {
    allEvents {
      data {
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
  }
`;

exports.handler = async () => {
  const { data, errors } = await query(GET_EVENTS);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ events: data.allEvents.data }),
  };
};
