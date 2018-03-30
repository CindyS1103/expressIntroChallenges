const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/hello', function(req, res) {
  let string = `"Hello!" ${req.params.hello}`
  res.send(string);
});

app.post('/create/:name', function(req, res) {
  let obj = {
    id:1,
    name: req.params.name
  }
  res.json(obj);
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/verify/:age', function(req, res) {
  if(req.params.age > 13){
    res.status(200).send('all good');
  } else if(req.params.age < 13){
    res.status(403).send('no good');
  }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
