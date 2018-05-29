import knex from '../db';

export enum UserStatus {
  ACTIVE = 'Active',
  ARCHIVED = 'Archived',
  DISABLED = 'Disabled',
}

export interface IUserData {
  id: number;
  status: UserStatus;
  firstName: string;
  lastName: string;
  createdDate: Date;
  updatedDate: Date;
}

export class User implements IUserData {
  public static async getOne(context: any, id: string | number) {
    const results = await buildQuery({ id });
    return results[0] ? new User(results[0]) : null;
  }

  public static async getMany(context: any, filter: IUserFilter) {
    const results = await buildQuery(filter);
    return results.map((data: IUserData) => new User(data));
  }

  public id: number;
  public status: UserStatus;
  public firstName: string;
  public lastName: string;
  public createdDate: Date;
  public updatedDate: Date;

  private data: IUserData;

  constructor(data: IUserData) {
    this.id = data.id;
    this.status = data.status;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.data = data;
  }
}

export interface IUserFilter {
  id?: number | string;
}

const buildQuery = (filters: IUserFilter = {}) => {
  let query = knex('users');

  if (filters.id !== undefined) {
    query = query.where('id', filters.id);
  }

  return query;
};
