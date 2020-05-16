const {User, validate, validateID} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

///// TASK: Make endpoints handle errors e.g JSON error more kindly /////
///// TASK: Encrypt the password /////



// Validate the id and return any errors
function returnIDValidationError(res, _id) {
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);
}

function returnValidationError(res, obj) {
    const { error } = validate(obj);
    if (error) return res.status(400).send(error.details[0].message);
}



// CREATE USER
router.post("/", async (req, res) => {

    // Validate the request body and display any errors
    returnValidationError(res, req.body);

    // Get details from the request body
    const { email, username, password } = req.body;

    // If user email/username already exists, return error
    let user = await User.find().or([{ email }, { username }]);
    if (user.length > 0) return res.status(400).send("User already registered.");
    user = new User({email, username, password});

    // Try to save the user in the DB and return error message if it fails
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the user wasn't saved.");
    }
    
    // Get user ID and return user object
    const {_id} = user;
    res.status(200).send({_id, email, username});
});



// GET USER BY ID
router.get("/:userId", async (req, res) => {

    // Get ID and return error message if user doesn't exist
    const _id = req.params.userId;
    returnIDValidationError(res, _id);

    const user = await User.findOne({_id});
    if (!user) return res.status(400).send("User doesn't exist.");

    // Return the user object without the password
    const {email, username} = user;
    res.status(200).send({email, username, _id});
    
});



// DELETE USER BY ID
router.delete('/:userId', async (req, res) => {
    
    // Validate ID and find user in DB
    const _id = req.params.userId;
    returnIDValidationError(res, _id);
    
    // Try to delete the user from the DB and return error message if it fails
    try {
        await User.deleteOne({_id});
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the user wasn't deleted.");
    }
    
    // Confirm deletion with a message
    res.status(200).send(`User of ID ${_id} was successfully deleted.`);
    
});



// UPDATE USER BY ID
router.patch('/:userId', async (req, res) => {
    
    const _id = req.params.userId;
    let user = await User.findOne({_id});
    if (!user) return res.status(400).send("User doesn't exist.");

    const {email, username, password} = req.body;
    const newUserFields = {email, username, password};
    const {email: oldEmail, username: oldUsername, password: oldPassword} = user;
    const oldUserFields = {email: oldEmail, username: oldUsername, password: oldPassword};
    let newUser = {};
    let passwordChanged = false;

    // For each key/value pair in newUserFields
    // If the value is null
    // Set newUser[key] to the old value
    // If the value is not null
    // Set newUser[key] to the new value
    for (let [key, value] of Object.entries(newUserFields)) {
        if (!value) {
            newUser[key] = oldUserFields[key];
        } else {
            newUser[key] = value;
            if (key == "password") {
                passwordChanged = true;
            }
        }
    }

    returnValidationError(res, newUser);
    
    // Update the user object with the values from newUser
    user = Object.assign(user, newUser);

    // Try to save the user in the DB and return error message if it fails
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the user wasn't saved.");
    }
    
    // Create the user object
    const userObj = {_id, email, username, oldEmail, oldUsername};
    // If the password's changed, add a message to user object
    if (passwordChanged) {
        userObj.password = "(The password has been successfully changed.)";
    }

    // Return user object
    res.status(200).send(userObj);
});



module.exports = router;