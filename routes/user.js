module.exports = function(passport){
    var express = require('express');
    var router = express.Router();

    router.get('user/new', function(req, res){
        res.render('user/new', {formData: req.flash("email")[0], loginError:req.flash('loginError')});
    });
    
    router.post('/login',
        function(req, res, next){
            req.flash("email");
            if(req.body.email.length === 0 || req.body.password.length === 0){
                req.flash("email", req.body.email);
                req.flash("loginError", "Please enter both email and password.");
                res.redirect('.login');
            }else{
                next();
            }
        },
        passport.authenticate('local-login', {
            successRedirect: '/posts',
            failureRedirect: '/login',
            failureFlash: true
        })
    );
    
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    return router;
};