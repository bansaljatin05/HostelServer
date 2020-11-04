const express = require('express');
const bodyParser = require('body-parser');
const seatRouter = express.Router();
seatRouter.use(bodyParser.json());
const Seat = require('../models/seatAllocation');
const User = require('../models/user');
var authenticate = require('../authenticate');
const cors = require('./cors');

seatRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Seat.find({ hostel: req.user.hostel })
            .populate('hostel')
            .then((seat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(seat);
            }, err => next(err))
            .catch(err => next(err))
    })

    .put(cors.corsWithOptions, (req, res, next) => {
        res.end('Put request not valid on the /seat end point')
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        req.body.hostel = req.user.hostel;
        Seat.create(req.body)
            .then((seat) => {
                Seat.findById(seat._id)
                    .populate('hostel')
                    .then((seat) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(seat);
                    }, err => next(err))
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seat.deleteMany({ hostel: req.user.hostel })
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, (err) => next(err))
    })

seatRouter.route('/:seatId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Seat.findById(req.params.seatId)
            .then((seat) => {
                if (seat != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(seat);
                } else {
                    const err = new Error("seat not found");
                    err.status = 403;
                    return (next(err));
                }
            }, (err) => next(err))
            .catch(err => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seat.findById(req.params.seatId)
            .then((seat) => {
                if (seat != null) {
                    Seat.findByIdAndUpdate(req.params.seatId, {
                        $set: req.body
                    }, { new: true })
                        .then((newseat) => {
                            Seat.findById(newseat._id)
                                .then((se) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-type', 'application/json');
                                    res.json(se);
                                }, err => next(err))
                        }, err => next(err))
                }
            }, err => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end('Post operation not available')
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seat.findByIdAndDelete(req.params.seatId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, err => next(err))
    })

module.exports = seatRouter;