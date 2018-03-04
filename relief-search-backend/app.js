var apiRouter = require('./api/index');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'html');

app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));
app.use('/Images',express.static(__dirname + '/Images'));
app.use('/data',express.static(__dirname + '/'));


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
Endpoint: https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect

Key 1: 6db02891df294caa88b462af42da79be

Key 2: 3e7e41f0ae364b3c9222ac69d74dd029*/
