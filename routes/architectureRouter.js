const express = require('express');
const bodyParser = require('body-parser');

const architectureRouter = express.Router();
architectureRouter.use(bodyParser.json());

const Architectures = require('../models/architecture')

architectureRouter.route('/')
.get((req, res, next) => {
    Architectures.find({})
    .then((architecture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(architecture);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Architectures.create(req.body)
    .then((architecture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(architecture)
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