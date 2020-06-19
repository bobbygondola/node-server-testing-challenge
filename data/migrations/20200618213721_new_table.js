
exports.up = function(knex) {
    return knex.schema.createTable('faculty', tbl => {
        tbl.increments();                                         //id
        tbl.string('username',128).notNullable().unique().index();//username
        tbl.string('password',128).notNullable().index();         //password
        tbl.string('department',128).nullable().index();          //department
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('faculty')
  };
