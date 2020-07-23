exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
