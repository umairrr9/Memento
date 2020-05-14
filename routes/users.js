const {User, validate, validateID} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// TASK: Make endpoints handle errors e.g JSON error more kindly

// validate the id and return any errors
function returnIDError(res, _id) {
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);
}

// Create User
router.post("/", async (req, res) => {

    // validate the request body and if there's any errors, display them
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // get the details from the request body
    const { email, username, password } = req.body;

    // if user email/username exists, return error
    let user = await User.find().or([{ email }, { username }]);
    if (user.length > 0) return res.status(400).send("User already registered.");
    user = new User({email, username, password});

    // TASK: encrypt the password

    // try to save the user in the DB. Return an error message if necessary.
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, something went wrong.");
    }
    
    // get user id and return user object
    const {_id} = user;
    res.status(200).send({_id, email, username});
});

// Get User by ID
router.get("/:userId", async (req, res) => {

    const _id = req.params.userId;
    returnIDError(res, _id);

    const user = await User.findOne({_id});
    if (!user) return res.status(400).send("User doesn't exist.");

    // return user object without password
    const {email, username} = user;
    res.status(200).send({email, username, _id});
    
});

// Delete User by ID
router.delete('/:userId', async (req, res) => {
    
    // validate id and find user in DB
    const _id = req.params.userId;
    returnIDError(res, _id);
    
    // try to delete the user in the DB. Return an error message if necessary.
    try {
        await User.deleteOne({_id});
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, user wasn't deleted.");
    }
    
    res.status(200).send(`User of ID ${_id} was successfully deleted.`);
    
});

// Update User by ID
// For the fields you don't want to update, you must pass in the 
// previous values of those fields with this request;
// TASK: Make endpoint more efficient
router.patch('/:userId', async (req, res) => {
    
    const _id = req.params.userId;
    const user = await User.findOne({_id});
    if (!user) return res.status(400).send("User doesn't exist.");

    const {email, username, password} = req.body;
    const {email: oldEmail, username: oldUsername, password: oldPassword} = user;
    const newUser = {};
    let passwordChanged = false;

    if (!email) {
        newUser.email = oldEmail;
    } else {
        newUser.email = email;
    }

    if (!username) {
        newUser.username = oldUsername;
    } else {
        newUser.username = username;
    }

    if (!password) {
        newUser.password = oldPassword;
    } else {
        newUser.password = password;
        passwordChanged = true;
    }

    const { error } = validate(newUser);
    if (error) return res.status(400).send(error.details[0].message);
    
    user.email = newUser.email;
    user.username = newUser.username;
    user.password = newUser.password;

    // try to save the user in the DB. Return an error message if necessary.
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, something went wrong.");
    }
    
    // create the userObj
    const userObj = {_id, email, username, oldEmail, oldUsername};
    // if the password's changed, add a message to userObj
    if (passwordChanged) {
        userObj.password = "The password has been successfully changed.";
    }

    res.status(200).send(userObj);
});



module.exports = router;

