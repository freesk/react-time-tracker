const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', function (req, res) {

	const username = req.body.username;
	const email    = req.body.email;
	const password = req.body.password;

	var user = new User({
		username: username,
		email: email,
		password: bcrypt.hashSync(password)
	});

	user.save((err, doc) => {
		// status 500 - server error
    if (err) return res.status(500).json({
      error: err.message
    });
		// status 201 - new resourse created
		res.status(201).json({
			error: null
		});
	});

});

router.get('/login', (req, res) => {

	const username = req.query.username;
	const password = req.query.password;

	User.findOne({ username: username }, (err, doc) => {
		if(err) return res.status(500).json({
      error: err.message
    });

		// status 401 - not authorized
		if(!doc) return res.status(401).json({
			error: "user not found"
		});

		// decrypt and compare
		if(!bcrypt.compareSync(password, doc.password)) return res.status(401).json({
      error: "invalid password"
    });

		// create a token
		const token = jwt.sign({ user: doc }, 'secret', { expiresIn: 7200 });

		// good to go
    res.status(200).json({
      error: null,
      token: token
    });

	});

});

module.exports = router;
