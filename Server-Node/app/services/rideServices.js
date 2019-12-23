'use strict';

const mongoose = require('mongoose');
const Ride = mongoose.model('Ride');


exports.save = function(params){
   
    const newRide = new Ride(ride);
    const promise = newRide.save();
    
    return promise;
}

exports.saveRide = function(ride){
    const newRide = new Ride(ride);
    const promise = newRide.save();
    
    return promise;
}

exports.get = function(username){
    const promise = Ride.findById(id).exec();
    return promise;
}

/**Function of searching user specific rides */
exports.searchUserRides = function(username){
    const promise = Ride.find({
        username: {$eq: username}
    }).exec();

    return promise;
}

/**Function of Deleting ride */
exports.delete = function (id) {
    const promise = Ride.remove({_id: id});
    return promise;
};



