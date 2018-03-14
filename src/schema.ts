import { GraphQLCompositeType } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [
  `
type Query {
  hello: String!
}
`,
];

const resolvers = {
  Query: {
    hello: (root: any, args: object, context: object) => 'Hello World.',
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
