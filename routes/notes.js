const {Note, validate, doesNoteExist} = require('../models/note');
const {User, validateID, doesUserExist} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

////// TASK: Parse content for JS code

// CREATE NOTE
router.post("/", async (req, res) => {

    // Validate the request body and display any errors
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Get details from the request body
    const { title, content, userId } = req.body;

    const user = await doesUserExist(userId);
    if (!user) return res.status(400).send("User doesn't exist.");
    
    // Create note object
    let note = new Note({ title, content, userId });

    // Try to save the note in the DB and return error message if it fails
    try {
        await note.save(); 
    } catch (error) {
        res.status(400).send("Error, the note wasn't saved.");
    }

    // Get note ID and return note object
    const {_id} = note;
    res.status(200).send({_id, userId, title, content});

});



// GET NOTE BY ID
router.get("/:noteId", async (req, res) => {

    // Get ID and return error message if note doesn't exist
    const _id = req.params.noteId;
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);

    const note = await doesNoteExist(_id);
    if (!note) return res.status(400).send("Note doesn't exist.");

    const {title, content, userId} = note;
    res.status(200).send({title, content, _id, userId});
});



// GET ALL NOTES BY USER ID
router.get("/all/:userId", async (req, res) => {

    // Get ID and return error message if user doesn't exist
    const _id = req.params.userId;
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // get all the users notes
        const notes = await Note.find({userId: _id});
        res.status(200).send(notes);
    } catch (err) {
        res.status(400).send("Couldn't find any notes for this user.");
    }

});

// DELETE NOTE BY ID
router.delete("/:noteId", async (req, res) => {

    // Validate ID and find user in DB
    const _id = req.params.noteId;
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);
    
    // Try to delete the user from the DB and return error message if it fails
    try {
        await Note.deleteOne({_id});
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the note wasn't deleted.");
    }
    
    // Confirm deletion with a message
    res.status(200).send(`Note of ID ${_id} was successfully deleted.`);

});



// UPDATE NOTE BY ID
router.patch("/:noteId", async (req, res) => {

    const _id = req.params.noteId;
    const { error: errorId } = validateID({_id});
    if (errorId) return res.status(400).send(errorId.details[0].message);

    let note = await doesNoteExist(_id);
    if (!note) return res.status(400).send("Note doesn't exist.");

    const {title: oldTitle, content: oldContent, userId: oldUserId} = note;
    const userId = oldUserId; // userid can't be changed
    const {title, content} = req.body;
    const newNoteFields = {title, content, userId};
    const oldNoteFields = {title: oldTitle, content: oldContent, userId: oldUserId}
    let newNote = {};

    // For each key/value pair in newNoteFields
    // If the value is null
    // Set newNote[key] to the old value
    // If the value is not null
    // Set newNote[key] to the new value
    for (let [key, value] of Object.entries(newNoteFields)) {
        if (!value) {
            newNote[key] = oldNoteFields[key];
        } else {
            newNote[key] = value;
        }
    }

    const { error } = validate(newNote);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Update the note object with the values from newNote
    note = Object.assign(note, newNote);

    // Try to save the note in the DB and return error message if it fails
    try {
        await note.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the note wasn't saved.");
    }
    
    // Create the note object
    const noteObj = {_id, title, content, oldTitle, oldContent};

    // Return note object
    res.status(200).send(noteObj);

});



module.exports = router;