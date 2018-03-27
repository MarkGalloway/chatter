const knex = require('../db');

export const TopicStatus = {
  VISIBLE: 'Visible',
  ARCHIVED: 'Archived',
};

export class Topic {
  constructor(data) {
    this.id = data.id;
    this.author = data.author;
    this.body = data.body;
    this.status = data.status;
    this.created_date = data.created_date;
    this.updated_date = data.updated_date;
    this.data = data;
  }

  static async getOne(context, id) {
    const results = await knex()
      .where('id', id)
      .from('topics');

    return results[0] ? new Topic(results[0]) : null;
  }
}
