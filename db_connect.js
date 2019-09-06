const { MongoClient } = require('mongodb');
const { URL, DB } = require('./utils/constants');

const initDB = (callback) => {
	const connected = (err, client) => {
		if(err){
			return callback(err);
		}
		_db = client.db(DB);
		return callback(null, _db)
	}
	MongoClient.connect(URL, connected)
}

const  getDB = () => {
	return _db
}

module.exports = {
	initDB, 
	getDB
}


