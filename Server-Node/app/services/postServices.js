'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.saveRide = function(post){
    const newPost = new Post(post);
    const promise = newPost.save();
    
    return promise;
}

/**Function of searching by Exact Date and Time */

exports.searchByExactDateTime = function(params){
    const promise = Post.find({
        from: {$eq: params.from},
        to: { $eq: params.to},
        travel_date: { $eq: params.travel_date}
    }).exec();
    return promise;
};

/**Function of searching by Location and Time */
exports.searchByLocationAndTime = function(params){
    const promise = Post.find({
        $or : [
        {
        from: {$eq: params.from},
        to: { $eq: params.to},
        travel_date: { $gte: params.travel_date},
        travel_time: { $gte: params.travel_time}},
        {
        from: {$eq: params.from},
        to: { $eq: params.to},
        travel_date: { $gt: params.travel_date}}
        ]
    }).exec();
    return promise;
};

/**Function of searching by Location */

exports.searchByLocation = function(params){
    const promise = Post.find({
        from: {$eq: params.from},
        to: { $eq: params.to},
        travel_date: { $gte: params.travel_date}
    }).exec();
    return promise;
};

exports.searchUserPosts = function(username){
    const promise = Post.find({
        username: {$eq: username}
    }).exec();

    return promise;
}

/**Function for find post by id */
exports.get = function(id){
    const promise = Post.findById(id).exec();
    return promise;
}

exports.update = function(post){
    const promise = Post.findOneAndUpdate({_id: post._id}, post).exec();
    return promise;
}

exports.delete = function(id){
    const promise = Post.remove({_id: id}).exec();
    return promise;
}

