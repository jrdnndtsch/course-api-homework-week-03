const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
	title: String, 
	duration: String,
	language: String,
	session: String,
})



module.exports = mongoose.model('Course', courseSchema);