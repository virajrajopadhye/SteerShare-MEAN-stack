'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Post data model
let Post = new Schema({
    from: {
        type: String,
        required: "from is required"
    },
    to: {
        type: String,
        required: "destination is required"
    },
    travel_date: {
        type: String, 
        required: "Start date is required"
    },
    travel_time: {
        type: String,
        required: "Start time is required"
    },
    seats: {
        type: String,
        required: "seats is required"
    },
    price:{
        type: String,
        required: "price is required"
    },
    
    username: {
        type: String, 
        required: "Driver usename is required"
    },

    description:{
        type: String,
        required: "description is required"
    },

}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
Post.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Post.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Post', Post);