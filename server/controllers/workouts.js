const express = require('express');
const workout = require('../models/workout');

const app = express.Router();

app.post("/", (req, res, next) => {
    workout.add(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
});

app.get("/getFromDate/:user/:date", (req, res, next) => {
    console.log(req.params.date);
    workout.get(req.params.date, req.params.user)
    .then(x=>  res.send(x) )
    .catch(next)
});

app.get("/getPartial/:user/:exercise", (req, res, next) => {
    console.log(req.params.exercise);
    workout.getPartial(req.params.exercise, req.params.user)
    .then(x=>  res.send(x) )
    .catch(next)
});

module.exports = app;