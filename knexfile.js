const { database, username, password } = require('./config/dbcredentials');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: database,
      user: username,
      password: password,
    }
  }
  
};
