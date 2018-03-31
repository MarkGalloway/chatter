exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', table => {
    table.increments('id').primary();

    // TODO: FK
    table.integer('author').notNullable();

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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('topics');
};
