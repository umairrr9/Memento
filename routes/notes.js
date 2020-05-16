const {Note, validate} = require('../models/note');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// CREATE NOTE
router.post("/", async (req, res) => {

    // Validate the request body and display any errors
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Get details from the request body
    const { title, content, userId } = req.body;

    ///// TASK: Check userId exists /////

    // Create note object
    let note = new Note({ title, content, userId });

    // Try to save the note in the DB and return error message if it fails
    try {
        await note.save(); 
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, something went wrong.");
    }

    // Get note ID and return note object
    const {_id} = note;
    res.status(200).send({_id, userId, title, content});

});



// GET NOTE BY ID
router.post("/:noteId", async (req, res) => {

});



// GET ALL NOTES BY USER ID
router.post("/:userId", async (req, res) => {

});



// DELETE NOTE BY ID
router.post("/:noteId", async (req, res) => {

});



// UPDATE NOTE BY ID
router.post("/:noteId", async (req, res) => {

});



module.exports = router;