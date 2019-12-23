'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User data model
let User = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    password_hash: {
        type: String, 
        required: "Password hash is required"
    },
    firstName: {
        type: String, 
        required: "First name is required"
    },
    lastName: {
        type: String, 
        required: "Last name is required"
    },
    profileImgName: {
        type: String, 
        required: "Profile picture is required"
    },
    createDate: {
        type: Date, 
        default: Date.now
    }
}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
User.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
User.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', User);