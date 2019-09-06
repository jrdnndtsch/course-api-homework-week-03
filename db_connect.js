const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = 'hackeryouLive';


module.exports = {
	client: () => MongoClient.connect(url),
	dbName: dbname
}
