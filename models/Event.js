const mongoose = require("mongoose");

// Define the event schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,  // Storing time as a string, you might want to use a Date type if including a time component
        required: true
    },
    society: {
        type: String,
        trim: true,
        required: true
    },
    venue: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    registerLink: {
        type: String,
        trim: true
    }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;


