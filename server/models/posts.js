const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: String,
    likedBy: [],
    date: Date,
    authorId: Number,
});

module.exports = mongoose.model("Post", postSchema);