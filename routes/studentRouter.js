const express = require('express');
const bodyParser = require('body-parser');

const studentRouter = express.Router();

studentRouter.use(bodyParser.json());

studentRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {

}) 

.put((req, res, next) => {
    
}) 

.post((req, res, next) => {
    
}) 

.delete((req, res, next) => {
    
}) 

module.exports = studentRouter;