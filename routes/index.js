var express = require('express'),
    router = express.Router();

// homepage
router.get('/', function(req, res){
    res.render('index', {pageTitle:'Passport Demo App'});
});

// about
router.get('/about', function(req, res){
    res.render('about', {pageTitle:'About Us'});
})

// contact
router.get('/contact', function(req, res){
    res.render('contact', {pageTitle:'Contact Us'});
})

module.exports = router;