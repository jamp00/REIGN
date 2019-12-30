const mongoose = require('mongoose')

var ObjectId = require('mongodb').ObjectID;

const articleSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
//        default: Date.now
    },
    title: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    story_title: {
        type: String,
        required: false,
    },
    story_url: {
        type: String,
        required: false,
    },
    estado: {
        type: Boolean,
        required: false
//        default: true,
    }
})

//articleSchema.index({ title: 1, story_title: 1}, { unique: true });
articleSchema.index({ created_at: 1});

module.exports = mongoose.model('Article', articleSchema)




