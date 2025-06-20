const Joi = require('joi');

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        minlength: 5,

        maxlength: 50

    },

    email: {

        type: String,

        required: true,

        minlength: 5,

        maxlength: 255,

        unique: true

    },

    password: {

        type: String,

        required: true,

        minlength: 5,

        maxlength: 1024,

    }

});



const User = mongoose.model('User', userSchema);



function validateUser(user) {

    const schema = Joi.object({
        // Define the validation schema for the user object
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),

        password: Joi.string().min(5).max(1024).required()

    });



    return schema.validate(user);

}



exports.userSchema = userSchema;

exports.User = User;

exports.validate = validateUser;