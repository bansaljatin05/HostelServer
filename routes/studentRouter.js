const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = express.Router();
studentRouter.use(bodyParser.json());
const Students = require('../models/students');
const User = require('../models/user');

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
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Students.deleteMany({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, (err) => next(err))
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err))
}) 

studentRouter.route('/:studentId')
.get((req, res, next) => {
    Students.findById(req.params.studentId)
    .then((student) => {
        if(student != null) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(student);
        } else {
            const err = new Error("Student not found");
            err.status = 403;
            return(next(err));
        }
    }, (err) => next(err))
    .catch(err => next(err));  
}) 
.put((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Students.findById(req.params.studentId)
            .then((student) => {
                if(student != null) {
                    Students.findByIdAndUpdate(req.params.studentId,{ 
                        $set: req.body
                    }, { new: true })
                    .then((newStudent) => {
                        Students.findById(newStudent._id)
                        .then((stu) => {
                            res.statusCode = 200;
                            res.setHeader('Content-type', 'application/json');
                            res.json(stu);
                        }, err => next(err))
                    }, err => next(err))
                }
            }, err => next(err))
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    }, err => next(err))
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.end('Post operation not available')
})
.delete((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Students.findByIdAndDelete(studentId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, err => next(err))
        }
        else {
            const err = new Error("You are not authorized");
            err.status = 404;
            return(next(err));
        }
    }, err => next(err))
    .catch(err => next(err))
})

module.exports = studentRouter;

