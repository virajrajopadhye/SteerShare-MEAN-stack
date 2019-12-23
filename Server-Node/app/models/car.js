'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Car data model
let Car = new Schema({
    brand: {
        type: String,
        required: "Brand is required"
    },
    model: {
        type: String,
        required: "Model is required"
    },
    color: {
        type: String,
        required: "Color is required"
    },
    user_id: {
        type: String,
        required: "User ID is required"
    },
    plate: {
        type: String,
        required: "Plate number is required"
    }
}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
Car.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Car.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Car', Car);