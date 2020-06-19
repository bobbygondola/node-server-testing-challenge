
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('faculty').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('faculty').insert([
        {username: 'bobbyg', password: 'bobbyg', department: 'software'},
        {username: 'elon', password: 'musk', department: 'engineering'}
      ]);
    });
};
