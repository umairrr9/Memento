const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Create User
router.post("/", async (req, res) => {

    // validate the request body and if there's any errors, display them
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if user email/username exists, return error
    let user = await User.find().or([{ email: req.body.email }, { username: req.body.username }]);
    console.log(user);
    if (user.length > 0) return res.status(400).send("User already registered.");

    const { email, username, password } = req.body;
    user = new User({email, username, password});

    // TASK: encrypt the password


    try {
        await user.save();
    } catch (error) {
        console.error(error);
        res.status(400).send("Error, something went wrong.");
    }
    
    const {_id} = user;
    res.status(200).send({_id, email, username});
});


module.exports = router;

