'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Ride data model
let Ride = new Schema({
    username:{
        type: String,
        required: "passengers username is required"
    },
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
   
    price:{
        type: String,
        required: "price is required"
    },

    description:{
        type: String
    },

    email:{
        type: String
    },

    userid:{
        type: String,
        required:"userid is required"
    },

    driversusername: {
        type: String,
        required:"drivers username is required"
    }

}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
Ride.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Ride.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Ride', Ride);