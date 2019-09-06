const express = require('express');
const router = express.Router();
const {client, dbName} = require('../db_connect');
const {ObjectId} = require('mongodb');

const {getDB} = require('../db_connect');

// GET /courses/
router.route('/')
    .get(async (req, res, next) => {
      const db = getDB();
      try {
        db.collection('courses').find({...req.query}).toArray((err, docs) => {
          // send a repsonse
          res.status(200).send({
              data: docs
          })
        })
      } catch(e) {
        next(e);
      }
    
    })
// POST /courses/    
    .post(async (req, res, next) => {
    
      try {
        const {title, duration, language, session} = req.body;
        const db = getDB();
        db.collection('courses').insertOne({
          title: title, 
          duration: duration, 
          language: language, 
          session: session
        }, (err, record) => {
          res.status(200).send({data: {
            insertedCount: record.insertedCount, 
            id: record.insertedId
          }});
        })
      } catch(e) {
        next(e);
      }
    })

// GET /courses/:id
router.route('/:id')
    .get(async (req, res, next) => {
      try {
      	const db = getDB();
        const courseID = new ObjectId(req.params.id)
        db.collection('courses').findOne({_id: courseID}, (err, doc) => {
          res.status(200).send({
              data: doc
          });
        })

      } catch (e) {
          next(e);
      }
    })
// DELETE /courses/:id    
    .delete(async (req, res, next) => {
      try {
        const db = getDB();
        const courseID = new ObjectId(req.params.id)
        db.collection('courses').deleteOne({_id: courseID}, (err, doc) => {
          res.status(200).send({
              data: doc
          });
        })

      } catch (e) {
          next(e);
      }
    })


exports.router = router;