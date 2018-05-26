jest.mock('../../db');

import knex from '../../db';

import { IReplyData, Reply } from '../reply';

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex('users').del();
  await knex('topics').del();
  await knex('replies').del();
  await knex.destroy();
});

const USER_FIXTURE = {
  firstName: 'Cookie',
  lastName: 'Monster',
};

const TOPIC_FIXTURE = {
  body: 'Where can find cookie?',
};

const REPLY_FIXTURE = {
  body: 'Nom Nom Nom Nom.',
};

let userIds: number[];
let topicIds: number[];
let replyIds: number[];

beforeEach(async () => {
  await knex('users').del();
  await knex('topics').del();

  userIds = await knex('users')
    .insert([USER_FIXTURE])
    .returning('id');

  topicIds = await knex('topics')
    .insert([{ ...TOPIC_FIXTURE, authorId: userIds[0] }])
    .returning('id');

  replyIds = await knex('replies')
    .insert([{ ...REPLY_FIXTURE, authorId: userIds[0], topicId: topicIds[0] }])
    .returning('id');
});

describe('Reply', () => {
  it('should create a Reply object', async () => {
    const results = await knex('replies').where('id', replyIds[0]);
    const data: IReplyData = results[0];
    const reply = new Reply(data);

    expect(reply).toHaveProperty('id', data.id);
    expect(reply).toHaveProperty('authorId', data.authorId);
    expect(reply).toHaveProperty('topicId', data.topicId);
    expect(reply).toHaveProperty('body', data.body);
    expect(reply).toHaveProperty('status', data.status);
    expect(reply).toHaveProperty('createdDate', data.createdDate);
    expect(reply).toHaveProperty('updatedDate', data.updatedDate);
  });
});
