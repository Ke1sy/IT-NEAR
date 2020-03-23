const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: String,
    likesCount: Number,
    date: Date,
    authorId: Number,
});

module.exports = mongoose.model("Post", postSchema);