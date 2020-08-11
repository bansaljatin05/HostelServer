const express = require('express');
const bodyParser = require('body-parser');
const mealsBillRouter = express.Router();
mealsBillRouter.use(bodyParser.json());
const MealsBill = require('../models/mealsBill');
const User = require('../models/user');

mealsBillRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    MealsBill.find({})
    .then((mealsBill) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(mealsBill);
    }, err => next(err))
    .catch(err => next(err))
}) 

.put((req, res, next) => {
    res.end('Put request not valid on the /mealsBill end point')
}) 

.post((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            MealsBill.create(req.body)
            .then((mealsBill) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mealsBill)
            }, (err) => next(err))
            .catch((err) => next(err))
        } else {
            const err = new Error("You are not authenticated to perform this operation");
            err.status = 404;
            return(next(err));
        }
    })
}) 

.delete((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
        if(user.admin) {
            MealsBill.deleteMany({})
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

mealsBillRouter.route('/:mealsBillId')
.get((req, res, next) => {
    MealsBill.findById(req.params.mealsBillId)
    .then((mealsBill) => {
        if(mealsBill != null) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(mealsBill);
        } else {
            const err = new Error("mealsBill not found");
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
            MealsBill.findById(req.params.mealsBillId)
            .then((mealsBill) => {
                if(mealsBill != null) {
                    MealsBill.findByIdAndUpdate(req.params.mealsBillId,{ 
                        $set: req.body
                    }, { new: true })
                    .then((newBill) => {
                        MealsBill.findById(newBill._id)
                        .then((bill) => {
                            res.statusCode = 200;
                            res.setHeader('Content-type', 'application/json');
                            res.json(bill);
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
            MealsBill.findByIdAndDelete(mealsBillId)
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

module.exports = mealsBillRouter;

