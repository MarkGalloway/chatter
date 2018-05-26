import knex from '../db';

export enum ReplyStatus {
  VISIBLE = 'Visible',
  ARCHIVED = 'Archived',
}

export interface IReplyData {
  id: number;
  authorId: number;
  topicId: number;
  body: string;
  status: ReplyStatus;
  createdDate: Date;
  updatedDate: Date;
}

export class Reply implements IReplyData {
  public static async getOne(context: any, id: string | number) {
    const results = await knex('replies').where('id', id);
    return results[0] ? new this(results[0]) : null;
  }

  public id: number;
  public authorId: number;
  public topicId: number;
  public body: string;
  public status: ReplyStatus;
  public createdDate: Date;
  public updatedDate: Date;

  private data: IReplyData;

  constructor(data: IReplyData) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.topicId = data.topicId;
    this.body = data.body;
    this.status = data.status;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.data = data;
  }
}
