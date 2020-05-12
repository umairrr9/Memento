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
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(RegExp("[a-z]")).required(), // TASK for UMAIR: figure out regex pattern for passwords
    username: Joi.string().min(1).max(40).regex(RegExp("[a-zA-Z0-9]"))
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;


// (?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!?]{8, 50}

// /(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/ 