const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = [
  `
type Query {
  hello: String!
}
`,
];

const resolvers = {
  Query: {
    hello: (root, args, context) => 'Hello World.',
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
