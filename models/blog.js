const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
    }

});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;