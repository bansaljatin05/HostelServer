const express = require('express');
const bodyParser = require('body-parser');
const mealsRouter = express.Router();
mealsRouter.use(bodyParser.json());
const Meals = require('../models/meals');
const User = require('../models/user');

mealsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Meals.find({})
    .then((meals) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(meals);
    }, err => next(err))
    .catch(err => next(err))
})

.put((req, res, next) => {
    res.end('Put request not valid on the /meals end point')
}) 

.post((req, res, next) => {
    const user = req.body.username;
    User.findOne({username: user})
    .then((user) => {
    if(user.admin){
    Meals.create(req.body)
    .then((meals) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(meals)
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
            Meals.deleteMany({})
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

module.exports=mealsRouter;