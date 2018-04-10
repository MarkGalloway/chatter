exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('topics', table => {
      table.increments('id').primary();

      // TODO: FK
      table
        .integer('author')
        .unsigned()
        .notNullable();

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

      table.index(['status', 'author']);
    }),
    knex.schema.createTable('replies', table => {
      table.increments('id').primary();

      // TODO: FK
      table
        .integer('author')
        .unsigned()
        .notNullable();

      table
        .integer('topic_id')
        .references('topics.id')
        .unsigned()
        .notNullable();

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

      table.index(['status', 'author', 'topic_id']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('topics').dropTableIfExists('replies');
};
