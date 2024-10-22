const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: true
    },
    Tags: {
        type: Array,
        required: false
    },
    Link: {
        type: String,
        required: false
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Business", BusinessSchema, "Businesses");
