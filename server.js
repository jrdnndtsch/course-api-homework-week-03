'use strict';

const { PORT } = require('./utils/constants');
const { router: courseRoutes} = require('./routes/courses.router');

const {initDB} = require('./db_connect');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

// Utilize routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/courses', courseRoutes); 


initDB((err) => {
	app.listen(PORT, () => {
	  console.log(`app running on port ${PORT}`);
	});
})




