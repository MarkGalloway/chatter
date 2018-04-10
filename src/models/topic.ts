import knex from '../db';

export enum TopicStatus {
  VISIBLE = 'Visible',
  ARCHIVED = 'Archived',
}

export interface ITopicData {
  id: number;
  authorId: number;
  body: string;
  status: TopicStatus;
  createdDate: Date;
  updatedDate: Date;
}

export class Topic implements ITopicData {
  public static async getOne(context: any, id: string | number) {
    const results = await knex('topics').where('id', id);
    return results[0] ? new Topic(results[0]) : null;
  }

  public id: number;
  public authorId: number;
  public body: string;
  public status: TopicStatus;
  public createdDate: Date;
  public updatedDate: Date;

  private data: ITopicData;

  constructor(data: ITopicData) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.body = data.body;
    this.status = data.status;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.data = data;
  }
}
