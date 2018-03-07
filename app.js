var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/APITesteDatabase');

var tokenManeger = require('./routes/token-manager');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(tokenManeger.tokenValidator);
// Adicionado para ter o usuário na rendereização das páginas
// Talvez deva ser movido para um local mais apropriado
app.use(function (req, res, next) {
    if (req.user) {
        res.locals.usuario = req.user;
    }
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    var status = err.status || 500;
    res.status(status);
//  res.render('error');
//    console.log(err);
    var obj = {};
    obj.message = err.message;
    obj.status = status;
    if (req.app.get('env') === 'development') {
        obj.stack = err.stack;
    }
    res.json(obj);
});

module.exports = app;