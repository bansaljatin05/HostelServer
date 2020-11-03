const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const architectureRouter = express.Router();
architectureRouter.use(bodyParser.json());

const Architectures = require('../models/architecture')

architectureRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Architectures.findOne({ hostel: req.user.hostel })
            .populate('hostel')
            .then((architecture) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(architecture);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Architectures.findOneAndUpdate({}, {
            $set: req.body
        }, { new: true })
            .then((architecture) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(architecture);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /architecture')
    })

module.exports = architectureRouter;
