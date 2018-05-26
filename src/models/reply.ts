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
    const results = await buildQuery({ id });
    return results[0] ? new Reply(results[0]) : null;
  }

  public static async getMany(context: any, filter: IReplyFilter) {
    const results = await buildQuery(filter);
    return results.map((data: IReplyData) => new Reply(data));
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

export interface IReplyFilter {
  id?: number | string;
  topicId?: number;
}

const buildQuery = (filters: IReplyFilter = {}) => {
  let query = knex('replies');

  if (filters.id !== undefined) {
    query = query.where('id', filters.id);
  }

  if (filters.topicId !== undefined) {
    query = query.where('topicId', filters.topicId);
  }

  return query;
};
