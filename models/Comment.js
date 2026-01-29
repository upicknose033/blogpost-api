const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is Required"]
	},
	commentText: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);