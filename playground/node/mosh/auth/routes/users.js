const { validate, User } = require('../models/user');

const express = require('express');

const router = express.Router();



router.post('/', async (req, res) => {

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);



    // Check if user already exists

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) return res.status(400).send('User already registered.');



    const user = new User({

        name: req.body.name,

        email: req.body.email,

        password: req.body.password

    });



    try {

        await user.save();

        res.send(user);

    } catch (ex) {

        res.status(500).send('Something failed.');

    }

});




module.exports = router;