const express = require('express');
const bodyParser = require('body-parser');

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

const Employees = require('../models/employees');
const User = require('../models/user');

employeeRouter.route('/')
.get((req, res, next) => {
    console.log(req.body);
    Employees.find({})
    .then((employees) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employees);
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.post((req, res, next) => {
    const user = req.user.admin;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Employees.create(req.body)
            .then((employee) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(employee)
            }, (err) => next(err))
            .catch((err) => next(err))
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    }) 
}) 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employees');
}) 
.delete((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Employees.deleteMany({})
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

employeeRouter.route('/:employeeId')
.get((req, res, next) => {
    Employees.findById(req.params.employeeId)
    .then((employee) => {
        if(employee != null) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(employee);
        } else {
            const err = new Error("Employee not found");
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
            Employees.findById(req.params.employeeId)
            .then((employee) => {
                if(employee != null) {
                    Employees.findByIdAndUpdate(req.params.employeeId,{ 
                        $set: req.body
                    }, { new: true })
                    .then((newEmployee) => {
                        Employees.findById(newEmployee._id)
                        .then((emp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-type', 'application/json');
                            res.json(emp);
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
            Employees.findByIdAndDelete(employee._id)
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

module.exports = employeeRouter;