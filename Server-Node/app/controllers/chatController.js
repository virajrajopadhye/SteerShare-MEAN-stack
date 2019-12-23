'use strict';
const chatService = require('../services/chatServices');

exports.post = function(req, res){
    const newChat = Object.assign({}, req.body);
    const resolve = (chat) => {
        res.status(200);
        res.json(chat);
    };

    chatService.add(newChat)
    .then(resolve)
    .catch(renderErrorResponse(res));

}


exports.get = function(req, res){
    const resolve = (chat) => {
        res.status(200);
        res.json(chat);
    }

    chatService.get(req.params.name)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.getroom = function(req, res){
    const resolve = (chat) => {
        res.status(200);
        res.json(chat);
    }

    chatService.getbyroom(req.params.room)
        .then(resolve)
        .catch(renderErrorResponse(res));
};



