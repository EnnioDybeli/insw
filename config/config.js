var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: 3000,
    db: 'mongodb://localhost/insw-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: 3000,
    db: 'mongodb://localhost/insw-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: 3000,
    db: 'mongodb://localhost/insw-production'
  }
};

module.exports = config[env];
