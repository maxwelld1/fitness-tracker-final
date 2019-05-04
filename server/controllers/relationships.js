const express = require('express');
const relationship = require('../models/relationship');

const app = express.Router();

app.post("/sendRequest", (req, res, next) => {
    relationship.add(req.body.senderID, req.body.recipientID)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.get("/getPending/:id", (req, res, next) => {
    relationship.getPending(req.params.id)
    .then(x => res.send(x) )
    .catch(next)
});
app.get("/confirm/:id", (req, res, next) => {
    //console.log({body: req.body})
    relationship.confirm(req.params.id)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.get("/delete/:id", (req, res, next) => {
    //console.log({body: req.body})
    relationship.deleteRequest(req.params.id)
    .then(x=>  res.send(x) )
    .catch(next)
});

module.exports = app;