const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password.');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
 
});



function validate(req) {

    const schema = Joi.object({

        email: Joi.string().min(5).max(255).required().email(),

        password: Joi.string().min(5).max(1024).required()

    });
    return schema.validate(req);
};

module.exports = router;    