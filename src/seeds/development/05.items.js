exports.seed = function (knex) {
    return knex("items")
      .del()
      .then(function () {
        return knex("items").insert([
          {
            name: "some-item",
            price: 25,
          },
          {
            name: "some-second-item",
            price: 300,
          },
        ]);
      });
  };
  