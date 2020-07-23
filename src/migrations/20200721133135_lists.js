exports.up = function (knex) {
  return knex.schema.createTable("lists", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.bigInteger("fk_user_id").unsigned().notNullable();
    table.foreign("fk_user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("lists");
};
