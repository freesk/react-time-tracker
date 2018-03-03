var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  date: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
	seconds: {
		type: Number,
		required: true
	},
	project: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	activity: {
		type: String,
		required: true
	}
});

var Record = mongoose.model('Record', schema);

module.exports = Record;