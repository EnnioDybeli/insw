var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://meteor:insw2016@ds013260.mlab.com:13260/heroku_rr98k0lg'
  },

  test: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://meteor:insw2016@ds013260.mlab.com:13260/heroku_rr98k0lg'
  },

  production: {
    root: rootPath,
    app: {
      name: 'insw'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://meteor:insw2016@ds013260.mlab.com:13260/heroku_rr98k0lg'
  }
};

module.exports = config[env];
