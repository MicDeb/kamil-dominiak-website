// delete-testimonial.js

const query = require('./utils/query');

const DELETE_EVENT = `
  mutation($id: ID!) {
    deleteEvent(id: $id){
      _id
    }
  }
`;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(
    DELETE_EVENT, { id },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ deletedEvent: data.deletedEvent }),
  };
};
