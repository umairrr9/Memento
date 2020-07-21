const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


const noteSchema = mongoose.Schema({
    note: {
        type: Object,
        default: {} 
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


async function doesNoteExist(_id) {
    try {
        const note = await Note.findOne({_id});
        return note;
    } catch (err) {
        return null;
    }
}

  
exports.Note = Note;
exports.validate = validateNote;
exports.doesNoteExist = doesNoteExist;