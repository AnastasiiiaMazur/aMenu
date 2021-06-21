const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/menu';
const db = monk(connectionString);

module.exports = db;