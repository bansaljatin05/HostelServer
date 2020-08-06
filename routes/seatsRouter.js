const express = require('express');
const bodyParser = require('body-parser');
const seatRouter = express.Router();
seatRouter.use(bodyParser.json());
const Seat = require('../models/seatAllocation');
const User = require('../models/user');

seatRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Seat.find({})
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

.post((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
    if(user.admin){
    Seat.create(req.body)
    .then((seat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(seat)
    }, (err) => next(err))
    .catch((err) => next(err))}
    
    else {
        const err = new Error("You are not authenticated to perform this operation");
        err.status = 404;
        return(next(err));
    }
    }, (err) => next(err))
    .catch((err) => next(err))

    
}) 
.delete((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Seat.deleteMany({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, (err) => next(err))
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

seatRouter.route('/:seatId')
.get((req, res, next) => {
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
.put((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
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
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    }, err => next(err))
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.end('Post operation not available')
})
.delete((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            Seat.findByIdAndDelete(seatId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, err => next(err))
        }
        else {
            const err = new Error("You are not authorized");
            err.status = 404;
            return(next(err));
        }
    }, err => next(err))
    .catch(err => next(err))
})

module.exports = seatRouter;