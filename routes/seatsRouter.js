const express = require('express');
const bodyParser = require('body-parser');
const seatRouter = express.Router();
seatRouter.use(bodyParser.json());
const Seat = require('../models/seatAllocation');
const User = require('../models/user');
var authenticate = require('../authenticate');

seatRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get(authenticate.verifyUser, (req, res, next) => {
    Seat.find({hostel: req.user.hostel})
    .populate('hostel')
    .then((seat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(seat);
    }, err => next(err))
    .catch(err => next(err))
})

.put((req, res, next) => {
    res.end('Put request not valid on the /seat end point')
}) 

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Seat.deleteMany({hostel: req.user.hostel})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
})

seatRouter.route('/:seatId')
.get(authenticate.verifyUser, (req, res, next) => {
    Seat.findById(req.params.seatId)
    .then((seat) => {
        if(seat != null) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(seat);
        } else {
            const err = new Error("seat not found");
            err.status = 403;
            return(next(err));
        }
    }, (err) => next(err))
    .catch(err => next(err));  
}) 
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Seat.findById(req.params.seatId)
    .then((seat) => {
        if(seat != null) {
            seat.findByIdAndUpdate(req.params.seatId,{ 
                $set: req.body
            }, { new: true })
            .then((newseat) => {
                seat.findById(newseat._id)
                .then((se) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(se);
                }, err => next(err))
            }, err => next(err))
        }
    }, err => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('Post operation not available')
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Seat.findByIdAndDelete(seatId)
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, err => next(err))
})

module.exports = seatRouter;