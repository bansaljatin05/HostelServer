const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

const Employees = require('../models/employees');
const User = require('../models/user');

employeeRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    console.log(req.body);
    Employees.find({hostel: req.user.hostel})
    .populate('hostel')
    .then((employees) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employees);
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    req.body.hostel = req.user.hostel;
    Employees.create(req.body)
    .then((employee) => {
        Employees.findById(employee._id)
        .populate('hostel')
        .then((employee) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employee)
        }, err => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employees');
}) 
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employees.deleteMany({hostel: req.user.hostel})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
}) 

employeeRouter.route('/:employeeId')
.get(authenticate.verifyUser, (req, res, next) => {
    Employees.findById(req.params.employeeId)
    .populate('hostel')
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
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employees.findById(req.params.employeeId)
    .then((employee) => {
        if(employee != null) {
            Employees.findByIdAndUpdate(req.params.employeeId, { 
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
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('Post operation not available')
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employees.findByIdAndDelete(req.params.employeeId)
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, err => next(err))
})

module.exports = employeeRouter;