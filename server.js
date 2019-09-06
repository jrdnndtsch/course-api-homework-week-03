'use strict';


const { router: courseRoutes} = require('./routes/courses.router');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

// Utilize routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/courses', courseRoutes); 

app.listen(3000, () => {
  console.log('app running on port 3000');
});

