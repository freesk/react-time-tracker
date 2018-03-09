const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Json2csvParser = require('json2csv').Parser;

const Asem = require('../misc/asem');

const moment = require('moment');

const User = require('../models/user');
const Record = require('../models/record');

// middleware that is specific to this router
router.use('/', (req, res, next) => {
	// each request must contain a token
	const token = req.query.token;
  jwt.verify(token, 'secret', function(err, decoded) {
    if(err) return res.status(401).json({
      error: "not authorized"
    });
    next();
  });
});

// get all records
router.get('/get', (req, res, next) => {
	const decoded = jwt.verify(req.query.token, 'secret');
	const userId = decoded.user._id;

  // filter by user id
  Record.find({ "user" : userId }, { "user": 0 })
	 .exec(function(err, doc) {
	   if(err) return res.status(500).json({
	     error: err.message
	   });
	   // good to go
	   res.status(200).json({
	     error: null,
			 doc: doc
	   });
	 });
});

// update time
router.post('/update', (req, res, next) => {

	const decoded = jwt.verify(req.query.token, 'secret');
	const userId = decoded.user._id;
	const data   = req.body.data;
	const errors = [];

	const asem = new Asem(() => {
		if(errors.length) return res.status(500).json({
			error: errors.reduce((accumulator, currentValue) =>
				accumulator + ", " + currentValue
			)
		});
		res.status(200).json({
			error: null
		});
	}, data.length);

	function onError(err) {
		errors.push(err.message);
		asem.p();
	}

	data.forEach((obj) => {
		// filter by user id and recrd id
		Record.findOne({ "user" : userId, "_id" : obj._id })
			.exec(function(err, doc) {
				if(err) return onError(err.message);
				// update the number of seconds
				doc.seconds = obj.seconds;
				// save the update
				doc.save((err) => {
					if(err) return onError(err.message);
					asem.p();
				});
			});
	});

})

// delete a record
router.post('/delete', (req, res, next) => {
	const decoded = jwt.verify(req.query.token, 'secret');
	const userId = decoded.user._id;
	const recordId = req.body.recordId;

	// filter by user id
	Record.find({ "user" : userId, "_id" : recordId }, { "user": 0 })
		.remove()
		.exec(function(err) {
			if(err) return res.status(500).json({
				error: err.message
			});
			// good to go
			res.status(200).json({
				error: null
			});
		});

});

// create a record
router.post('/post', (req, res, next) => {
	const decoded = jwt.verify(req.query.token, 'secret');
	const userId = decoded.user._id;

	const project  = req.body.project;
	const activity = req.body.activity;
	const details  = req.body.details;
	const seconds  = 0;
	const date		 = req.body.date;

	const record = new Record({
		project: project,
		activity: activity,
		details: details,
		seconds: seconds,
		date: date,
		user: userId
	});

	record.save((err, doc) => {
    if (err) return res.status(500).json({
      error: err.message
    });
		res.status(201).json({
			error: null,
			doc: doc
		});
	});

});

router.post('/export', (req, res, next) => {
	const decoded = jwt.verify(req.query.token, 'secret');
	const userId = decoded.user._id;

	const from = req.body.from;
	const to = req.body.to;

	const fromMoment = moment.unix(from);
	const toMoment = moment.unix(to);

	function getUnixTimestamp(string) {
		return moment(string, "MM-DD-YYYY").unix();
	}

	// filter by user id
	Record.find({ "user" : userId }, { "user": 0 })
	 .exec(function(err, doc) {
		 if(err) return res.status(500).json({
			 error: err.message
		 });

		 const records = doc;

		 records.sort((a, b) => {
			 if (getUnixTimestamp(a.date) < getUnixTimestamp(b.date))
			   return -1;
			 if (getUnixTimestamp(a.date) > getUnixTimestamp(b.date))
			   return 1;
			 return 0;
		 });

		 console.log("");
		 console.log(records);

		 console.log("");
		 console.log("from " + fromMoment.format('MM-DD-YYYY'));
		 console.log("to " + toMoment.format('MM-DD-YYYY'));

		 const filtered = records.filter(record =>
			 moment(record.date, "MM-DD-YYYY").isBetween(fromMoment, toMoment)
		 );

		 console.log("");
		 console.log(filtered);

		 const formatted = filtered.map(record => {

			 const time = moment(record.seconds*1000).format('HH:mm:ss');

			 return {
				 project: record.project,
				 activity: record.activity,
				 details: record.details,
				 time: time,
				 date: record.date
			 };

		 });

		 const fields = [
			 "project",
			 "activity",
			 "details",
			 "time",
			 "date"
		 ];

		 const json2csvParser = new Json2csvParser({ fields });

		 const csv = json2csvParser.parse(formatted);

		 console.log(csv);

		 res.status(200).json({
 		 	 error: null,
 		 	 doc: csv
 		 });

	 });

});

module.exports = router;
