// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose'),       // to interact with our db
    Img = require('./models/img');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/Img'
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// send back all imgs
app.get('/api/imgs', function (req, res) {
  img.find({}).sort('-date').exec(function (err, imgs) {
    res.json(imgs);
  });
});

// create new img
app.post('/api/imgs', function (req, res) {
  // create new img with data from the body of the request (`req.body`)
  // body should contain the img text itself
  var newimg = new img({
    title: req.body.title,
    url: req.body.url,
    date: Date.now()
  });

  // save new img
  newimg.save(function (err, savedimg) {
    res.json(savedimg);
  });
});

// update img, but only the part(s) passed in in the request body
app.put('/api/imgs/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find img in db by id
  img.findOne({_id: targetId}, function (err, foundimg) {
    // update the img's text, if the new text passed in was truthy
    // otherwise keep the same text
    foundimg.title = req.body.title || foundimg.title;

    // save updated img in db
    foundimg.save(function (err, savedimg) {
      res.json(savedimg);
    });
  });
});

// delete img
app.delete('/api/imgs/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find img in db by id and remove
  img.findOneAndRemove({_id: targetId}, function (err, deletedimg) {
    res.json(deletedimg);
  });
});

// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});