const express = require('express');
const bodyParser = require('body-parser');
const hostelRouter = express.Router();
hostelRouter.use(bodyParser.json());
const Hostels = require('../models/hostels');
var authenticate = require('../authenticate');

hostelRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Hostels.find({})
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, err => next(err))
    .catch(err => next(err))
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('Put request not valid on the /hostel end point')
}) 

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Hostels.create(req.body)
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Hostels.deleteMany({})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
})

module.exports = hostelRouter;