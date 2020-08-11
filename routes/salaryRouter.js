const express = require('express');
const bodyParser = require('body-parser');

const salaryRouter = express.Router();
salaryRouter.use(bodyParser.json());

const Salaries = require('../models/notices')

salaryRouter.route('/')
.get((req, res, next) => {
    Salaries.find({hostel: req.user.hostel})
    .then((salaries) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(salaries);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Salaries.create(req.body)
    .then((salary) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(salary)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /salary');
}) 
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE opertaion not supported on /salary')
}) 

module.exports = salaryRouter;