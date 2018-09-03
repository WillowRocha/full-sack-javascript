const { MongoClient } = require('mongodb');

module.exports = function connection(connectionString) {
    return MongoClient.connect(connectionString, { useNewUrlParser: true });
};