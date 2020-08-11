const express = require('express');
const bodyParser = require('body-parser');

const noticeRouter = express.Router();
noticeRouter.use(bodyParser.json());

const Notices = require('../models/notices')

noticeRouter.route('/')
.get((req, res, next) => {
    Notices.find({})
    .then((notices) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notices);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Notices.create(req.body)
    .then((notice) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notice)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notices');
}) 
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE opertaion not supported on /notices')
}) 

module.exports = noticeRouter;