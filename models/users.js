const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
	nameOfTrail: String,
	dateHiked: { type: Date,},
	content: {
	  type: String,
	  required: true
	},
	rating: {
	  type: Number,
	  min: 1,
	  max: 5,
	},
	user: {
	  type: Schema.Types.ObjectId,
	  ref: 'User',
	  required: true
	},
	userName: String,
	userAvatar: String
  }, {
	timestamps: true
  });

const userSchema = new Schema(
	{
		name: String,
		googleId: {
			type: String,
			required: true,
		},
		email: String,
		avatar: String,
		favorites: [String],
		completed: [String],
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', userSchema)
