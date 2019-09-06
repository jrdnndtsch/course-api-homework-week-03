const { MongoClient } = require('mongodb');
const { URL } = require('./utils/constants');
const url = 'mongodb://localhost:27017';
const dbname = 'hackeryouLive';


module.exports = {
	client: () => MongoClient.connect(URL)
}
