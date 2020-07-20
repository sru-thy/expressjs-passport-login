var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var validate = require('mongoose-validator')

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
    usernameField: 'email',
    usernameQueryFields: ["email"]
};

// var nameValidator = [
//     validate({
//       validator: 'isLength',
//       arguments: [3, 7],
//       message: 'Name should be between 3 and 7 characters',
//     })
//   ]

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
        //validate: nameValidator
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose,options);

module.exports = mongoose.model("User", UserSchema);