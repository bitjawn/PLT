var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    validator = require('express-validator'),   
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var admins = require('./routes/admins');

var app = express();

// db connection
mongoose.connect('localhost:27017/loginapp');
require('./config/passport');

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',  exphbs({defaultLayout: 'layout', extename: '.hbs'}));
app.set('view engine', 'hbs');

// middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'what-ever-i-like',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));

// connect flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// global vars
app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// set the routes
app.use('/', routes);
app.use('/user', users);

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
    res.render('error', {error:res.locals.error, message:res.locals.message, status:res.status});
});//*/

module.exports = app;