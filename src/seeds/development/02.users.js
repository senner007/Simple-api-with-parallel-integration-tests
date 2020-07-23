exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          name: "nielshtg@gmail.com",
        },
        {
          name: "darkwin@duck.com",
        },
      ]);
    });
};
