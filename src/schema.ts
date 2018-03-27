import { GraphQLScalarType } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Kind } from 'graphql/language';
import moment from 'moment';

const typeDefs = [
  `
enum TopicStatus {
  Visible
  Archived
}

type Topic {
  id: ID!
  author: String!  # TODO: Expand when user is implemented
  body: String!
  status: TopicStatus!
  created_date: Date!
  updated_date: Date
}

type Query {
  hello: String!
}
`,
];

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date',
    parseValue(value) {
      return moment(value).toDate();
    },
    serialize(value) {
      return moment(value).format();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        const date = moment(ast.value);
        if (date.isValid()) {
          return date.toDate();
        }
      }
    },
  }),
  Query: {
    hello: (root: any, args: object, context: object) => 'Hello World.',
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
