const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Asem = require('../misc/asem');

const User = require('../models/user');
const Record = require('../models/record');


// middleware that is specific to this router
router.use('/', (req, res, next) => {
	// each request must contain a token
	const token = req.query.token;
  jwt.verify(token, 'secret', function(err, decoded) {
    if(err) return res.status(401).json({
      message: "not authorized"
    });
    next();
  });
});

router.get('/', (req, res, next) => {

	const userId = req.query.userId;

  // filter by user id
  Record.find({ "user" : userId }, { "user": 0 })
	 .exec(function(err, doc) {
	   if(err) return res.status(500).json({
	     message: "an error occured"
	   });
	   // good to go
	   res.status(200).json({
	     message: "success",
			 doc: doc
	   });
	 });
});

router.patch('/', (req, res, next) => {

	console.log("PATCH");

	const userId = req.query.userId;
	const data   = req.body.data;

	let errors = [];

	const asem = new Asem(() => {
		if(errors.length) return res.status(500).json({
			message: errors.reduce((accumulator, currentValue) =>
				accumulator + ", " + currentValue
			)
		});
		res.status(200).json({
			message: "success"
		});
	}, data.length);

	data.forEach((obj) => {
		// filter by user id and recrd id
		Record.findOne({ "user" : userId, "_id" : obj._id })
			.exec(function(err, doc) {
				if(err) {
					errors.push({
						status: 500,
						message: "an error occured"
					});
					asem.p();
					return;
				}
				// update the number of seconds
				doc.seconds = obj.seconds;
				// save the update
				doc.save((err) => {
					if(err) {
						errors.push({
							status: 500,
							message: "an error occured"
						});
						asem.p();
						return;
					}
					asem.p();
				});
			});

	});

})

router.delete('/', (req, res, next) => {
	const userId   = req.query.userId;
	const recordId = req.body.recordId;

	// filter by user id
	Record.find({ "user" : userId, "_id" : recordId }, { "user": 0 })
		.remove()
		.exec(function(err) {
			if(err) return res.status(500).json({
				message: "an error occured"
			});
			// good to go
			res.status(200).json({
				message: "success"
			});
		});

});

router.post('/', (req, res, next) => {
	const project  = req.body.project;
	const activity = req.body.activity;
	const details  = req.body.details;
	const seconds  = 0;
	const date		 = req.body.date;
	const userId   = req.query.userId;

	const record = new Record({
		project: project,
		activity: activity,
		details: details,
		seconds: seconds,
		date: date,
		user: userId
	});

	record.save((err, doc) => {
		// status 500 - server error
    if (err) return res.status(500).json({
      message: err.message
    });
		// status 201 - new resourse created
		res.status(201).json({
			message: "new record created",
			doc: doc
		});
	});

});

module.exports = router;
