exports.up = function (knex) {
    return knex.schema.createTable("list_items", (table) => {
      table.bigIncrements("id");
      table.bigInteger("fk_list_id").unsigned().notNullable();
      table.foreign("fk_list_id").references("id").inTable("lists").onDelete('CASCADE');
      table.bigInteger("fk_item_id").unsigned().notNullable();
      table.foreign("fk_item_id").references("id").inTable("items");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("deleted_at");
    });
  };
  exports.down = function (knex) {
    return knex.schema.dropTable("list_items");
  };
  