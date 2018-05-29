exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();

      table.text('firstName');
      table.text('lastName');

      table
        .enu('status', ['active', 'archived', 'disabled'])
        .notNullable()
        .defaultTo('active');

      table
        .timestamp('createdDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .timestamp('updatedDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(['status']);
    }),
    knex.schema.createTable('topics', table => {
      table.increments('id').primary();

      table
        .integer('authorId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');

      table.text('body').notNullable();

      table
        .enu('status', ['visible', 'archived'])
        .notNullable()
        .defaultTo('visible');

      table
        .timestamp('createdDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .timestamp('updatedDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(['status', 'authorId']);
    }),
    knex.schema.createTable('replies', table => {
      table.increments('id').primary();

      table
        .integer('authorId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');

      table
        .integer('topicId')
        .unsigned()
        .notNullable()
        .references('topics.id')
        .onDelete('CASCADE');

      table.text('body').notNullable();

      table
        .enu('status', ['visible', 'archived'])
        .notNullable()
        .defaultTo('visible');

      table
        .timestamp('createdDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .timestamp('updatedDate')
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(['status', 'authorId', 'topicId']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('topics')
    .dropTableIfExists('replies')
    .dropTableIfExists('users');
};
