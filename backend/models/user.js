const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 256,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40,
    unique: true
  },
  notesTree: {
    type: Array,
    default: [{title: null, parentId: null, id: 0}]
  }
});

const User = mongoose.model("User", userSchema);

// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$')).required(),    
    username: Joi.string().min(1).max(40).alphanum().required()
  });

  return schema.validate(user, { abortEarly: false });
}

function validateID(_id) {
  const schema = Joi.object({
    _id: Joi.string().alphanum().length(24)
  });

  return schema.validate(_id);
}

async function doesUserExist(_id) {
  try {
      const user = await User.findOne({_id});
      return user;
  } catch (err) {
      return null;
  }
}

function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$£%^&+=])(?=.*[a-z]).{8,}$')).required(),
    username: Joi.string().min(1).max(40).alphanum()
  });

  return schema.validate(user, { abortEarly: false });
}


exports.User = User;
exports.validate = validateUser;
exports.validateID = validateID;
exports.doesUserExist = doesUserExist;
exports.validateUserLogin = validateUserLogin;