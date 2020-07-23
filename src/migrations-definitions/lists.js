
exports.up = function(knex) {
    return knex.schema.createTable('lists', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.integer('owner_id').unsigned().notNullable();
        table.foreign('owner_id').references('id').inTable('owners');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('lists');
};  