const express = require("express"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash');
    mongoose.connect("", { useNewUrlParser: true,useUnifiedTopology: true })
        .then(() =>  console.log('connection succesful'))
        .catch((err) => console.error(err)); 
    mongoose.set('useCreateIndex', true);

    const app = express();
    app.set("view engine","ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser('moonji'));
    app.use(require("express-session")({
        secret:'moonji',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge : 4000000 }
    }));
    
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.isauth = req.isAuthenticated();
    next();
});

app.use('/',require('./routes/auth'))
 
app.listen(process.env.PORT || 3000, function(){
     console.log("listening to port")
 });