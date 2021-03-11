const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    issue_text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    }, 
    created_on: String,
    updated_on: String,
    created_by: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    assigned_to: {
        type: String,
        default: '',
        trim: true
    },
    open: {
        type: Boolean,
        default: true
    },
    status_text: {
        type: String,
        default: '',
        trim: true
    },
    project: {
        type: String,
        required: true,
        trim: true
    }
})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;