var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or email are incorrect',
        IncorrectUsernameError: 'Password or email are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given email/username is already registered'
    },
    usernameLowerCase: true,
    usernameField: 'email'
};

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
      },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose,options);

module.exports = mongoose.model("User", UserSchema);