const express = require('express');
const router = express.Router();
const { DB } = require('../utils/constants');
const { client } = require('../db_connect');
const {ObjectId} = require('mongodb');

// GET /courses/
router.route('/')
    .get(async (req, res, next) => {
      // connect to the database
    	const dbClient = await client()
    		.catch(err => console.log(err))
  
  		if(!dbClient){
  			return
  		}

      try {
        // query the databse
    		const db = dbClient.db(DB);
    		db.collection('courses').find({...req.query}).toArray((err, docs) => {
          // send a repsonse
    			res.status(200).send({
    			    data: docs
    			})
          // close the db connection
    			dbClient.close()
    		})

      } catch (e) {
         next(e);
      }
    })
// POST /courses/    
    .post(async (req, res, next) => {
      const dbClient = await client()
        .catch(err => console.log(err))
  
      if(!dbClient){
        return
      }

      try {
        // const {title, duration, language, session} = req.body;
        const db = dbClient.db(DB);
        db.collection('courses').insertOne({
         ...req.body
        }, (err, record) => {
          res.status(200).send({data: {
            insertedCount: record.insertedCount, 
            id: record.insertedId
          }});
          dbClient.close()
        })
      } catch(e) {
        next(e);
      }
    })

// GET /courses/:id
router.route('/:id')
    .get(async (req, res, next) => {
	  	const dbClient = await client()
	  		.catch(err => console.log(err))
			if(!dbClient){
				return
			}

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