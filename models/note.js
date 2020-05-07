const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

function validateUser(user) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{8,50}$")), // TASK for UMAIR: figure out regex pattern for passwords
      username: Joi.string().min(1).max(40).pattern(new RegExp("[a-zA-Z0-9]"))
    });
  
    return schema.validate(user);
}
  
exports.User = User;
exports.validate = validateUser;