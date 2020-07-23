exports.seed = function (knex) {
  return knex("lists")
    .del()
    .then(function () {
      return knex("lists").insert([
        {
          name: "my-list",
          fk_user_id: 1,
        },
        {
          name: "my-second-list",
          fk_user_id: 1,
        },
        {
          name: "my-third-list",
          fk_user_id: 2,
        },
      ]);
    });
};
