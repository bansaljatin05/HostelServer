const express = require('express');
const bodyParser = require('body-parser');

const architectureRouter = express.Router();
architectureRouter.use(bodyParser.json());

const Architectures = require('../models/architecture')

architectureRouter.route('/')
.get((req, res, next) => {
    Architectures.findOne({hostel: req.user.hostel})
    .populate('hostel')
    .then((architecture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(architecture);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    req.body.hostel = req.user.hostel;
    Architectures.create(req.body)
    .then((architecture) => {
        Architectures.findById(architecture._id)
        .populate('hostel')
        .then((architecture) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(architecture)
        }, err => next(err))  
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(architecture, {
        $set: req.body
    }, { new: true })
    .then((architecture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(architecture);
    }, (err) => next(err))
    .catch((err) => next(err));
}) 
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /architecture')
}) 

module.exports = architectureRouter;