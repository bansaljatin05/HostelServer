const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = express.Router();
studentRouter.use(bodyParser.json());
const Students = require('../models/students');

studentRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Students.find({})
    .then((students) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(students);
    }, err => next(err))
    .catch(err => next(err))
}) 

.put((req, res, next) => {
    res.end('Put request not valid on the /students end point')
}) 

.post((req, res, next) => {
    Students.create(req.body)
    .then((students) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 

.delete((req, res, next) => {
    res.end('deleting the students collection')
}) 

module.exports = studentRouter;