const env = process.env.NODE_ENV || 'development';

let config;
if (env === 'production') {
    config = require('./production.json');
} else {
    config = require('./development.json');
}

module.exports = {
    appName: config.name,
    appDescription: config.description
};
