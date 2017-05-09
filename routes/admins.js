var express = require('express'),
    router = express.Router(),
    csrf = require('csurf'),
    passport = require('passport'),
    cfc = require('../modules/cfc'),
    csrfProtection = csrf();

router.use(csrfProtection);

// user profile view
router.get('/profile', isLoggedIn, function(req, res, next){
    var user = req.user;
    var greeting = cfc('hey ' + user.fname);
    res.render('user/profile', {pageTitle:cfc(user.fname) + "'s Profile", user:{fname:cfc(user.fname), lname:cfc(user.lname), email:cfc(user.email), picture:user.picture}, greeting:greeting});
});

// signing out
router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

// registration
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {pageTitle:'Registration', csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0, isAdmin:false});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

// signing in
router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {pageTitle:'Sign In', csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

// forgot password
router.get('/forgot', function(req, res) {
    var messages = req.flash('error');
    res.render('user/forgot', {
        pageTitle:cfc('password reset'),
        user: req.user,
        messages:messages,
        hasErrors:messages.length > 0,
        csrfToken: req.csrfToken()
    });
});

router.post('/forgot', function(req, res, next){
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/user/forgot');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
           var sendmail = require('sendmail')({silent: true})

            sendmail({
              from: 'test@yourdomain.com',
              to: user.email,
              replyTo: 'jason@yourdomain.com',
              subject: 'MailComposer sendmail',
              html: 'Mail of test sendmail '
            }, function (err, reply) {
              console.log(err && err.stack)
              console.dir(reply)
            })
        }
    ], function(err) {
    if (err) return next(err);
        req.flash('error', err);
        res.redirect('/forgot');
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}