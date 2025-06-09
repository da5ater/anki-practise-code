const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');


// add code here ------
router.get('/me', auth, async (req, res) => {
    // Get the user from the token
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).send('User not found.');

    res.send(user);
});


//----------------------


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send('User already registered.');

    const user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    try {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    } catch (ex) {
        res.status(500).send('Something failed.');
    }
});


module.exports = router;    