var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet')
var index = require('./routes/index');

var app = express();

//use helmet
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static('public'));

//My MiddleWares
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(myLogger);
app.use(requestTime)
//Routes
app.use('/', index);
app.use('/addMonster', index);
app.use('/getMonsters', index);
app.use('/getMonsters/:name', index);
app.use('/MonsterEdit/:name', index);
app.route('/book')
  .get(function (req, res) {
  	var time = Date.now() - req.requestTime;
    res.send('Get a random book response time at: ' +time + 's');
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
