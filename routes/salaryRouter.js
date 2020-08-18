const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const salaryRouter = express.Router();
salaryRouter.use(bodyParser.json());
const cors = require('./cors');

const Salaries = require('../models/notices')

salaryRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Salaries.find({hostel: req.user.hostel})
    .populate('hostel')
    .then((salaries) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(salaries);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    req.body.hostel = req.user.hostel;
    Salaries.create(req.body)
    .populate('hostel')
    .then((salary) => {
        Salaries.findById(salary._id)
        .populate('hostel')
        .then((employee) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(salary)
        }, (err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /salary');
}) 
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE opertaion not supported on /salary')
}) 

salaryRouter.route('/:salaryId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Salaries.findById(req.params.salaryId)
    .populate('hostel')
    .then((salary) => {
        if(salary != null) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(salary);
        } else {
            const err = new Error("Salary not found");
            err.status = 403;
            return(next(err));
        }
    }, (err) => next(err))
    .catch(err => next(err));  
}) 
.put(cors.corsWithOptions, (req, res, next) => {
    Salaries.findById(req.params.salaryId)
    .then((salary) => {
        if(salary != null) {
            Salaries.findByIdAndUpdate(req.params.salaryId, { 
                $set: req.body
            }, { new: true })
            .then((newSalary) => {
                Salaries.findById(newSalary._id)
                .then((sal) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(sal);
                }, err => next(err))
            }, err => next(err))
        }
    }, err => next(err))
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.end('Post operation not available')
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Salaries.findByIdAndDelete(req.params.salaryId)
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, err => next(err))
})

module.exports = salaryRouter;