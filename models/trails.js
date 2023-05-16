const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const trailSchema = new Schema({
    name: { type: String, required: true },
    miles: {type: Number },
    latitude: {type: Number},
    longitude: {type: Number},
    region: {
        type: String,
        enum: ['Redwood Empire', 'Shasta and Trinity', 'Lassen and Modoc', 'Mendocino and Wine Country', 
        'Sacramento and Gold Country', 'Tahoe and Northern Sierra', 'San Francisco Bay Area', 'Yosemite and Mammoth Lakes',
        'Monterey and Big Sur', 'San Joaquin Valley', 'Sequoia and King Canyon'],
    },
    state: {type: String},
    //could we turn this into an enum dropdown?
    // features: {
    //     type: String,
    //     enum: ['Coast', 'Hills', 'Mountains', 'Creek', 'Rivers', 'Forests'],
    features: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null, // or provide a default user ID
        //required: true
      },
    userName: String,
    userAvatar: String,
    // reviews: [reviewSchema]
}, {
    timestamps: true
  });
  
  // Compile the schema into a model and export it
  module.exports = mongoose.model('Trail', trailSchema);