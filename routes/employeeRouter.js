const express = require('express');
const bodyParser = require('body-parser');

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

const Employees = require('../models/employees')

employeeRouter.route('/')
.get((req, res, next) => {
    Employees.find({})
    .then((employees) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employees);
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.post((req, res, next) => {
    Employees.create(req.body)
    .then((employee) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employee)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employees');
}) 

.delete((req, res, next) => {
    res.end('deleting the employee')
}) 

module.exports = employeeRouter;