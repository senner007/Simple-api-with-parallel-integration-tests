exports.seed = function (knex) {
    return knex("list_items")
      .del()
      .then(function () {
        return knex("list_items").insert([
          {
            fk_list_id: 1,
            fk_item_id: 1,
          }
        ]);
      });
  };
  