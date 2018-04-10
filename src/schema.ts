import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import moment from 'moment';

import * as models from './models';

const typeDefs = [
  `
scalar Date

enum TopicStatus {
  ${models.TopicStatus.VISIBLE}
  ${models.TopicStatus.ARCHIVED}
}

type Topic {
  id: ID!
  authorId: ID!
  # author: Author # TODO: Expand when user is implemented
  body: String!
  status: TopicStatus!
  createdDate: Date!
  updatedDate: Date
}

type Query {
  hello: String!
  topic(id: ID!): Topic
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
    topic: (root: any, args: { id: string }, context: object) =>
      models.Topic.getOne(context, args.id),
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
