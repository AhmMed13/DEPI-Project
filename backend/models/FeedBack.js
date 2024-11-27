const mongoose = require('mongoose')

const FeedBackSchema = new mongoose.Schema(
	{
		message: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
	},
	{ timestamps: true }
);

const FeedBack = mongoose.model("FeedBack", FeedBackSchema);

module.exports = FeedBack  