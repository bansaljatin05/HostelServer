const express = require('express');
const bodyParser = require('body-parser');
const complaintRouter = express.Router();
complaintRouter.use(bodyParser.json());
const Complaints = require('../models/complaints');

complaintRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    Complaints.find({hostel: req.user.hostel})
    .populate('studentName')
    .populate('hostel')
    .then((complaints) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(complaints);
    }, err => next(err))
    .catch(err => next(err))
})

.put((req, res, next) => {
    res.end('Put request not valid on the /hostel end point')
}) 

.post((req, res, next) => {
    req.body.studentName = req.user._id;
    req.body.hostel = req.user.hostel;
    Complaints.create(req.body)
    .then((complaint) => {
        Complaints.findById(complaint._id)
        .populate('studentName')
        .populate('hostel')
        .then((complaint) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(complaint);
        }, err => next(err))
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete((req, res, next) => {
    Complaints.deleteMany({hostel: req.user.hostel})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, (err) => next(err))
})

complaintRouter.put(':/complaintId', (req, res, next) => {
    Complaints.findById(req.params.complaintId)
    .then((complaint) => {
        if(complaint != null) {
            Complaints.findByIdAndUpdate(req.params.complaintId, { 
                $set: req.body
            }, { new: true })
            .then((complaint) => {
                Complaints.findById(complaint._id)
                .then((complaint) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(complaint);
                }, err => next(err))
            }, err => next(err))
        }
    }, err => next(err))
})

module.exports = hostelRouter;

