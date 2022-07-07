const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Create Model and attach schema the export
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;