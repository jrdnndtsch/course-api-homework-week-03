'use strict';
const { router: courseRoutes} = require('./routes/courses.router');
const express = require('express');
const bodyParser = require('body-parser');
const { PORT, URL, DB } = require('./utils/constants');
const mongoose = require('mongoose');
const app = express()

// Utilize routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/courses', courseRoutes); 

mongoose.connect(`${URL}/${DB}`)
	.then(() => {
		console.log(`connected to ${DB}`)
		app.listen(PORT, () => {
		  console.log(`app running on port ${PORT}`);
		});
	})
	.catch(err => console.log(err))



