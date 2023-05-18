const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    updates: [String]
})

module.exports = mongoose.model('FeedUpdate', feedSchema);
