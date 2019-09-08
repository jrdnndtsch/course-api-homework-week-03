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
        console.log(record)
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
      	const db = dbClient.db(DB);
        const courseID = new ObjectId(req.params.id)
        db.collection('courses').findOne({_id: courseID}, (err, doc) => {
          res.status(200).send({
              data: doc
          });
          dbClient.close()
        })

      } catch (e) {
          next(e);
      }
    })
// DELETE /courses/:id    
    .delete(async (req, res, next) => {
      const dbClient = await client()
        .catch(err => console.log(err))
      if(!dbClient){
        return
      }
      try {
        const db = dbClient.db(DB);
        const courseID = new ObjectId(req.params.id)
        db.collection('courses').deleteOne({_id: courseID}, (err, doc) => {
          res.status(200).send({
              data: doc
          });
          dbClient.close()
        })

      } catch (e) {
          next(e);
      }
    })


exports.router = router;