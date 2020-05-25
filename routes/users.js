const {User, validate, validateID, doesUserExist, validateUserLogin} = require('../models/user');
const {createHash, checkPassword} = require('../static/hash');
const {verifyJWT, generateJWT} = require('../static/auth');
const {replaceWithNew} = require("../static/helper");
const mongoose = require('mongoose');
const express = require('express');
const session = require("express-session");
const router = express.Router();

///// TASK: Make endpoints handle errors e.g JSON error more kindly /////
///// TASK: Turn repeated code into functions /////
///// TASK: Use JWT and sessions to validate users /////
///// TASK: Allow username/password login combo /////
///// TASK: Create function for line 41 loop

// LOGIN USER
router.post("/login", async (req, res) => {

    // Validate the request body and display any errors
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Get details from the request body
    const { email, username, password } = req.body;

    let user = await User.findOne().or([{ email }, { username }]);
    if (!user) return res.status(400).send("Login combination failed, please try again."); 
    const {_id} = user;

    const newUserFields = {email, username, password: createHash(password, _id)};
    const {email: oldEmail, username: oldUsername, password: oldPassword} = user;
    const oldUserFields = {email: oldEmail, username: oldUsername, password: oldPassword};
    let loginUser = replaceWithNew(newUserFields, oldUserFields);//{};

    // For each key/value pair in newUserFields
    // If the value is null
    // Set newUser[key] to the old value
    // If the value is not null
    // Set newUser[key] to the new value
    // for (let [key, value] of Object.entries(newUserFields)) {
    //     if (!value) {
    //         loginUser[key] = oldUser[key];
    //     } else {
    //         loginUser[key] = value;
    //     }
    // }

    if (JSON.stringify(loginUser) === JSON.stringify(oldUserFields)) {
        // Store jwt cookie
        const {email: loginEmail, username: loginUsername} = loginUser;
        const jwt = generateJWT(_id, loginEmail, loginUsername);
        res.cookie('user_jwt', jwt, {expires: new Date(Date.now() + 900000), httpOnly: true}); // 15 min expiry
        req.session.user = {email: loginEmail, username: loginUsername, _id};
        
        // Send user object
        res.status(200).send({email: loginEmail, username: loginUsername, _id});
    } else {
        res.status(400).send("Login combination failed, please try again.");
    }
    

});


// CREATE USER
router.post("/signup", async (req, res) => {

    // Validate the request body and display any errors
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Get details from the request body
    const { email, username, password } = req.body;

    // If user email/username already exists, return error
    let user = await User.find().or([{ email }, { username }]);
    if (user.length > 0) {
        return res.status(400).send("User already registered.");
    }

    user = new User({email, username, password});
    const {_id} = user;
    user.password = createHash(password, _id);

    // Try to save the user in the DB and return error message if it fails
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, the user wasn't saved.");
    }

    // Store jwt cookie
    const jwt = generateJWT(_id, email, username);
    res.cookie('user_jwt', jwt, {expires: new Date(Date.now() + 900000), httpOnly: true}); // 15 min expiry
    req.session.user = {_id, email, username};
    
    // Send user object
    res.status(200).send({_id, email, username});

});

// GET USER BY ID
router.get("/:userId", async (req, res) => {

    // Get ID and return error message if user doesn't exist
    const _id = req.params.userId;
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);

    const user = await doesUserExist(_id);
    if (!user) return res.status(400).send("User doesn't exist.");

    const {email, username} = user;
    res.status(200).send({email, username, _id});
});


// DELETE USER BY ID
router.delete('/:userId', async (req, res) => {
    
    // Validate ID
    const _id = req.params.userId;
    const { error } = validateID({_id});
    if (error) return res.status(400).send(error.details[0].message);
    
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
    
    // Validate ID
    const _id = req.params.userId;
    let user = await doesUserExist(_id);
    if (!user) return res.status(400).send("User doesn't exist.");

    const {email, username, password} = req.body;
    const newUserFields = {email, username, createHash(password, _id)};
    const {email: oldEmail, username: oldUsername, password: oldPassword} = user;
    const oldUserFields = {email: oldEmail, username: oldUsername, password: oldPassword};
    let newUser = replaceWithNew(newUserFields, oldUserFields);

    // Validate the updated user values
    const { error } = validate(newUser);
    if (error) return res.status(400).send(error.details[0].message);
    
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
    if (password) userObj.password = "(The password has been successfully changed.)";

    // Return user object
    res.status(200).send(userObj);
});


module.exports = router;