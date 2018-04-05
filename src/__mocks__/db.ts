import knex from 'knex';
import { TEST_DATABASE_URL } from '../config';

export default knex({
  client: 'pg',
  connection: TEST_DATABASE_URL,
});
