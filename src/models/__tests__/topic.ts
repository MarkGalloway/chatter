jest.mock('../../db');

import knex from '../../db';

import { ITopicData, Topic } from '../topic';

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

let userIds: number[];
let topicIds: number[];

beforeEach(async () => {
  await knex('users').del();
  await knex('topics').del();

  userIds = await knex('users')
    .insert([USER_FIXTURE])
    .returning('id');

  topicIds = await knex('topics')
    .insert([{ ...TOPIC_FIXTURE, authorId: userIds[0] }])
    .returning('id');
});

describe('Topic', () => {
  it('should create a Topic object', async () => {
    const results = await knex('topics').where('id', topicIds[0]);
    const data: ITopicData = results[0];
    const topic = new Topic(data);

    expect(topic).toHaveProperty('id', data.id);
    expect(topic).toHaveProperty('authorId', data.authorId);
    expect(topic).toHaveProperty('body', data.body);
    expect(topic).toHaveProperty('status', data.status);
    expect(topic).toHaveProperty('createdDate', data.createdDate);
    expect(topic).toHaveProperty('updatedDate', data.updatedDate);
  });
});
