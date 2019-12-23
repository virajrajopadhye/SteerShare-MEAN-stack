'use strict';

const config = require('../../app/config.json');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const formdata = require('form-data');

module.exports = {
    authenticate,
    register
};


exports.save = function(params){
    const newUser = new User(params);
    const promise = newUser.save();
    return promise;
}

exports.search = function(params){
    const promise = User.find(params).exec();
    return promise;
};

exports.get = function(id){
    const promise = User.findById(id).exec();
    return promise;
}

exports.update = function(User){
    const promise = User.findOneAndUpdate({_id: user._id}, user).exec();
    return promise;
}

exports.delete = function(id){
    const promise = User.remove({_id: id}).exec();
    return promise;
}

async function authenticate({username, password}){

    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.password_hash)){
        const { password_hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user._id}, config.secret);
        return {
            ...userWithoutHash, 
            token
        };
    }
    else
        console.log("Something is wrong");
}

async function register(params){
    if(await User.findOne({username: params.username})){
        throw 'Username "' + params.username + '" already exists';
    }
    const user = new User(params);

    if(params.password) {
        user.password_hash = bcrypt.hashSync(params.password, 10);
    }

    await user.save();
}



