const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Event {
    id: ID!
    eventStartDate: String!
    eventStartTime: String
    eventEndDate: String
    eventPlace: String!
    eventName: String!
    eventDescription: String
    eventLink: String
    eventRole: String
  }

  type Query {
    events: [Event]!
  }
  
  type Mutation {
    addEvent(eventStartDate: String!, eventPlace: String!, eventName: String!): Event
    updateEvent(id: ID!, eventStartDate: String!, eventPlace: String!, eventName: String!): Event
  }
`;

const events = {};
let eventId = 0;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    events: () => Object.values(events),
  },
  Mutation: {
    addEvent: (_, data) => {
      eventId += 1;
      const id = `key-${ eventId }`;
      events[id] = { ...data, id };
      return events[id];
    },
    updateEvent: (_, data) => {
      events[data.id] = data;
      return events[data.id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
