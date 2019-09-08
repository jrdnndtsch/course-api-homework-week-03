const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
	title: String, 
	duration: String,
	language: String,
	session: String,
})

courseSchema.method('findSimilar', function(cb) {
	return this.model('Course').find({language: this.language}, cb)
})


// https://mongoosejs.com/docs/models.html
module.exports = mongoose.model('Course', courseSchema);