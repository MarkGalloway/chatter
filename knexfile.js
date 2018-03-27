const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  client: 'pg',
  connection: DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
