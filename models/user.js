const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


///// TASK: Figure out exclusions for password /////


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
    // password: Joi.string().regex(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}')).required(), // (?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$
    password: Joi.string().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')).required(), // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    username: Joi.string().min(1).max(40).alphanum() 
  });

  return schema.validate(user);
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

exports.User = User;
exports.validate = validateUser;
exports.validateID = validateID;
exports.doesUserExist = doesUserExist;