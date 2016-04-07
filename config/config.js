var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
var db = require('/locals');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: db.connectionString
  },

  test: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: db.connectionString
  },

  production: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: db.connectionString
  }
};

module.exports = config[env];
