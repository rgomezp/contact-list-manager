const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var Contact = require('./models');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())

app.post('/create', function (req, res) {
 var newContact = new Contact({
   name     : req.body.name,
   phone    : req.body.phone,
   birthday : req.body.birthday
 });

 newContact.save(function(err, contact){
   if(err){
     // there was an error saving the new contact
     res.status(400).json(err);
   }else{
     res.status(200).send();
   }
 });

});

app.get('/getContacts', function(req, res){
  Contact.find(function(err, docs){
    if(!err) return docs;
  }).then((docs)=>res.status(200).json(docs));
});

app.get('/ping', function(req, res){
  res.send('pong');
});

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
