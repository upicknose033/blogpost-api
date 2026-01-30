const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is Required']
	},
	content: {
		type: String,
		required: [true, 'Content is Required']
	},
	authorInfo: {
		type: String,
		required: [true, 'Author Information is Required']
	},
	author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is Required']
    },
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Blog', blogSchema);