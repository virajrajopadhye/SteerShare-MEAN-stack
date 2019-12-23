'use strict';

const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');


exports.add = function(params){
   
    const newChat = new Chat(chat);
    const promise = newChat.save();
    
    return promise;
}

exports.getbyroom = function(room) {
    const promise = Chat.find({ room: {$eq: room}
    }).exec();
    return promise;
  }


exports.get = function(name){
    const promise = Chat.find({
        name: {$eq: name}
    }).exec();

    return promise;
}


exports.delete = function (id) {
    const promise = Chat.remove({_id: id});
    return promise;
};



