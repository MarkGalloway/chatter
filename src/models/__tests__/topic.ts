import knex from '../../db';

import { ITopicData, Topic } from '../topic';

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex('topics').del();
  await knex.destroy();
});

const TOPIC_FIXTURE = {
  author: 1,
  body: 'Where can find cookie?',
};

let topicIds: number[];

beforeEach(async () => {
  await knex('topics').del();

  topicIds = await knex('topics')
    .insert([TOPIC_FIXTURE])
    .returning('id');
});

describe('Topic', () => {
  it('should create a Topic object', async () => {
    const results = await knex('topics').where('id', topicIds[0]);
    const data: ITopicData = results[0];
    const notification = new Topic(data);

    expect(notification).toHaveProperty('id', data.id);
    expect(notification).toHaveProperty('author', data.author);
    expect(notification).toHaveProperty('status', data.status);
    expect(notification).toHaveProperty('createdDate', data.createdDate);
    expect(notification).toHaveProperty('updatedDate', data.updatedDate);
  });
});
