var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    mongoose.connect("Add your connection string", { useNewUrlParser: true,useUnifiedTopology: true });  

    var app = express();
    app.set("view engine","ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(require("express-session")({
        secret:"moonji",
        resave: false,
        saveUninitialized: false
    }));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.isauth = req.isAuthenticated();
    next();
});

 app.get("/",function(req, res){
    res.render("home"); 
 });
 
 app.get("/register", function(req, res){
     res.render("register");
 });
 
 app.post("/register", function(req, res){
     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/login");
         });
     });
 });
 
 app.get("/login", function(req, res){
     res.render("login");
 });
 
 
 app.post("/login", passport.authenticate("local",{
     successRedirect: "/",
     failureRedirect: "/login",
 }), function(req, res){
    
 });
 
 app.get("/logout", function(req, res){
     req.logout();
     res.redirect("/");
 });
 
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }
 
 app.listen(process.env.PORT || 3000, function(){
     console.log("listening to port")
 });