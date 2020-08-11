const express = require('express');
const bodyParser = require('body-parser');
const hostelRouter = express.Router();
hostelRouter.use(bodyParser.json());
const Hostels = require('../models/hostels');

hostelRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Hostels.find({})
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, err => next(err))
    .catch(err => next(err))
})

.put((req, res, next) => {
    res.end('Put request not valid on the /hostel end point')
}) 

.post((req, res, next) => {
    Hostels.create(req.body)
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete((req, res, next) => {
    Hostels.deleteMany({})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
})

module.exports = hostelRouter;