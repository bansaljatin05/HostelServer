const express = require('express');
const bodyParser = require('body-parser');
const hostelRouter = express.Router();
hostelRouter.use(bodyParser.json());
const Hostels = require('../models/hostels');
var authenticate = require('../authenticate');
const cors = require('./cors');

hostelRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Hostels.find({})
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, err => next(err))
    .catch(err => next(err))
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('Put request not valid on the /hostel end point')
})

.post(cors.corsWithOptions, (req, res, next) => {
    Hostels.create(req.body)
    .then((hostels) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(hostels);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Hostels.deleteMany({})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
})

module.exports = hostelRouter;
