const { database, username, password } = require('./config/dbcredentials');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: database,
      user: username,
      password: password,
    }
  },

  ...knexSnakeCaseMappers()
  
};
