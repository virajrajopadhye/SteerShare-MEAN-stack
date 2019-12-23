'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the data model
let Chat = new Schema({
    room: String,
    name : String,
    message : String,
    updated_at: { type: Date, default: Date.now }

}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
Chat.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Chat.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Chat', Chat);