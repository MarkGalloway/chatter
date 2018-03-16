import Knex from 'knex';

function connect(databaseUrl: string): Knex {
  return Knex({
    client: 'pg',
    connection: databaseUrl,
  });
}

export default connect;
