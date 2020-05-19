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
        required: false
    },
    userId: {
        type: String,
        required: true
    }
});



const Note = mongoose.model("Note", noteSchema);

function validateNote(note) {
    const schema = Joi.object({
      title: Joi.string().min(1).max(100).required(),
      content: Joi.string(),
      userId: Joi.string().length(24).required()
    });
  
    return schema.validate(note);
}


  
exports.Note = Note;
exports.validate = validateNote;