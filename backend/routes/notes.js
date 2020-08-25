const { Note, doesNoteExist } = require('../models/note');
const { validateID, doesUserExist } = require('../models/user');
const { isLoggedIn } = require("../static/helper");;
const express = require('express');
const router = express.Router();

// CREATE NOTE
router.post("/create", isLoggedIn, async (req, res) => {

    // Get details from the request body
    const { _id: userId, isGuest = null } = req.session.user;
    if (isGuest) return res.status(400).send({ error: "Sorry, you must create an account before you can do that." });

    const user = await doesUserExist(userId);
    if (!user) return res.status(400).send({ error: "User doesn't exist." });

    // Create note object
    let note = new Note({ userId });

    // Try to save the note in the DB and return error message if it fails
    try {
        await note.save();
    } catch {
        res.status(400).send({ error: "Error, the note wasn't created." });
    }

    // Get note ID and return note object
    const { _id } = note;
    res.status(200).send({ noteId: _id, userId });

});


// GET NOTE BY ID
router.get("/:noteId", async (req, res) => {

    // Get ID and return error message if note doesn't exist
    const _id = req.params.noteId;
    const { error } = validateID({ _id });
    if (error) return res.status(400).send({ error: error.details[0].message });

    const noteDoc = await doesNoteExist(_id);
    if (!noteDoc) return res.status(400).send({ error: "Note doesn't exist." });

    const userID = req.session.user._id;
    if (noteDoc.userId !== userID) return res.status(400).send({ error: "Sorry, you can't access this note." });

    const { note, userId } = noteDoc;
    res.status(200).send({ note, userId, _id });
});


// GET ALL NOTES BY USER ID
// router.get("/all/:userId", async (req, res) => {

//     // Get ID and return error message if user doesn't exist
//     const _id = req.params.userId;
//     const { error } = validateID({ _id });
//     if (error) return res.status(400).send({ error: error.details[0].message });

//     try {
//         // get all the users notes
//         const notes = await Note.find({ userId: _id });
//         res.status(200).send(notes);
//     } catch (err) {
//         res.status(400).send({ error: "Couldn't find any notes for this user." });
//     }

// });


// DELETE NOTE BY ID
router.delete("/:noteId", async (req, res) => {

    // Validate ID and find user in DB
    const _id = req.params.noteId;
    const { error } = validateID({ _id });
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Try to delete the user from the DB and return error message if it fails
    try {
        await Note.deleteOne({ _id });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: "Error, the note wasn't deleted." });
    }

    // Confirm deletion with a message
    res.status(200).send({ message: `Note of ID ${_id} was successfully deleted.` });

});


// UPDATE NOTE BY ID
router.post("/:noteId", async (req, res) => {

    const { isGuest = null } = req.session.user;
    if (isGuest) return res.status(400).send({ error: "Sorry, you must create an account before you can save a note." });

    const _id = req.params.noteId;
    const { error: errorId } = validateID({ _id });
    if (errorId) return res.status(400).send({ error: "Sorry, this note ID was invalid, please try again" });

    let noteDoc = await doesNoteExist(_id);
    if (!noteDoc) return res.status(400).send({ error: "Sorry, this note doesn't exist." });

    const userID = req.session.user._id;
    
    if (noteDoc.userId !== userID) return res.status(400).send({ error: "Sorry, you can't access this note." });

    const oldNote = noteDoc.note;
    const { note: newNote } = req.body;
    noteDoc.note = newNote;


    // Try to save the note in the DB and return error message if it fails
    try {
        await noteDoc.save();
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: "Sorry, the note wasn't saved, please try again" });
    }

    // Return note object
    res.status(200).send({ _id, oldNote, newNote });

});


module.exports = router;