const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post('/create/:name/:age', function(req, res) {
  let object = {
    name: req.params.name,
    age: req.params.age
  }

  fs.writeFileSync('./storage.json', JSON.stringify(object));

  res.json(object);

});
app.get('/', function(req, res) {
  let storageData = fs.readFileSync('./storage.json', 'utf8');
  res.send(storageData);
});
app.get('/:name', function(req, res) {

  let storageData2 = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
  let filteredData = storageData2.filter(person => person.name === req.params.name)
  if(filteredData.length){
    res.send(filteredData[0]);
  }else {
    res.status(400).send('no good');
  }

});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
