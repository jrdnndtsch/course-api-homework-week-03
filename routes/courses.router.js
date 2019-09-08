const express = require('express');
const router = express.Router();
const { DB } = require('../utils/constants');
const { client } = require('../db_connect');
const {ObjectId} = require('mongodb');
const Course = require('./courses.model');

// GET /courses/
router.route('/')
    .get(async (req, res, next) => {
      try {
        // const newCourse = new Course({title: 'Javascript 2', duration: '8 week',language: 'HTML',session: 'Summer 19'})
        // newCourse.findSimilar(function(err, courses){
        //   console.log(courses)
        // })
        const courses = await Course.find({...req.query})
        res.status(200).send({
            data: courses
        })
      } catch (e) {
         next(e);
      }
    })
// POST /courses/    
    .post(async (req, res, next) => {
      const { title, duration, language, session } = req.body
      try {
        const course = new Course({...req.body});
        const record = await course.save();
        res.status(200).send({data: {
          id: record._id
        }});
      } catch(e) {
        next(e);
      }
    })

// GET /courses/:id
router.route('/:id')
    .get(async (req, res, next) => {
	 
      try {
        // with async await
        const course = await Course.findById(req.params.id)
        res.status(200).send({
            data: course
        });
      

        // with call back
        // Course.findById(req.params.id, (err, course) => {
        //   res.status(200).send({
        //     data: course
        //   })
        // })
      } catch (e) {
          next(e);
      }
    })
// DELETE /courses/:id    
    .delete(async (req, res, next) => {
      try {
       const course = await Course.findByIdAndRemove(req.params.id);
       if(course){
        res.status(204).send('Course was deleted')
       } else {
        res.status(404).send('Course not found')
       }

      } catch (e) {
          next(e);
      }
    })


exports.router = router;