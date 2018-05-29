import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import moment from 'moment';

import * as models from './models';

const typeDefs = [
  `
scalar Date

type Author {
  id: ID!
  firstName: String
  lastName: String
}

enum TopicStatus {
  ${models.TopicStatus.VISIBLE}
  ${models.TopicStatus.ARCHIVED}
}

type Topic {
  id: ID!
  authorId: ID!
  author: Author
  body: String!
  status: TopicStatus!
  createdDate: Date!
  updatedDate: Date
  replies: [Reply]!
}

enum ReplyStatus {
  ${models.ReplyStatus.VISIBLE}
  ${models.ReplyStatus.ARCHIVED}
}

type Reply {
  id: ID!
  authorId: ID!
  author: Author
  topicId: ID!
  topic: Topic!
  body: String!
  status: TopicStatus!
  createdDate: Date!
  updatedDate: Date
}

type Query {
  hello: String!
  author(id: ID!): Author
  topic(id: ID!): Topic
  reply(id: ID!): Reply
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
    hello: (root: any, args: object, context: any) => 'Hello World.',
    author: (root: any, args: { id: string }, context: any) =>
      models.User.getOne(context, args.id),
    topic: (root: any, args: { id: string }, context: any) =>
      models.Topic.getOne(context, args.id),
    reply: (root: any, args: { id: string }, context: any) =>
      models.Reply.getOne(context, args.id),
  },
  Topic: {
    replies: (root: models.Topic, args: {}, context: any) =>
      models.Reply.getMany(context, { topicId: root.id }),
    author: (root: models.Topic, args: {}, context: any) =>
      models.User.getOne(context, root.authorId),
  },
  Reply: {
    author: (root: models.Reply, args: {}, context: any) =>
      models.User.getOne(context, root.authorId),
    topic: (root: models.Reply, args: { id: string }, context: any) =>
      models.Topic.getOne(context, args.id),
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
