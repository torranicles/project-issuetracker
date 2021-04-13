const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Issue title must be at least 3 characters."]
    },
    issue_text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    }, 
    created_on: String,
    updated_on: String,
    created_by: {
        type: String,
        required: true,
        trim: true
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