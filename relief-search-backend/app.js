var apiRouter = require('./api/index');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var twilio = require('twilio');
var http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();


app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  console.log(res.body.Body)
  res.end(twiml.toString());
});

app.use(bodyParser.json());

app.set('view engine', 'html');

app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// export app
module.exports = app;

/*
Endpoint: https://westcentralus.api.cognitive.microsoft.com/face/v1.0

Key 1: 6db02891df294caa88b462af42da79be

Key 2: 3e7e41f0ae364b3c9222ac69d74dd029*/
