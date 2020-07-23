const express = require('express')
const router = express.Router()
const passport = require("passport")
const User = require('../models/user'); 
const { check, validationResult } = require('express-validator')

router.get("/",function(req, res){
    res.render("home"); 
 });
 
router.get("/register", notloggedin, function(req, res){
     res.render("register",{
        message: undefined
      });
 });
 
router.post("/register", notloggedin,[
  check('username').not().isEmpty().isLength({ max: 7 }),
] ,
function(req, res){
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("register",{message: 'username must be less than 7 characters' });
  }
    user = new User({username: req.body.username, email:req.body.email})
     User.register(user, req.body.password, function(err, user){
         if(err){
              if (err.name === 'MongoError' && err.code === 11000) {
                return res.render("register",{message: 'A user with the given email/username is already registered ' });
                }
                 req.flash("error", err.message);
                return res.render("register",{
                message: req.flash('error')
              });
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/login");
         });
     });
 });
 
router.get("/login", notloggedin,function(req, res){
     res.render("login",{
        message: req.flash('error')
      });
 });
 
router.post("/login", notloggedin, passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res,next){
    
 });
 
router.get("/logout", function(req, res){
     req.logout();
     res.redirect("/");
 });

function loggedin(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}

function notloggedin(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}
 
module.exports = router