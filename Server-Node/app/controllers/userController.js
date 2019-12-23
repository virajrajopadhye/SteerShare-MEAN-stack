'use strict';

//Import specific operations to database
const userService = require('../services/userServices');
const multer = require('multer');
const fs = require('fs');

exports.post = function(req, res){
    const newUser = Object.assign({}, req.body);
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    };

    userService.save(newUser)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

//Authenticate an user for with password
exports.authenticate = function(req, res, next){
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

//Register a new user
exports.register = function(req, res, next){
    userService.register(req.body)
        .then(()=> res.json({}))
        .catch(err => next(err));
}

//Parse the img from the request
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './profile_imgs');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

//Specify the field to get the img
exports.upload = multer({storage: storage}).single('profile_img');

exports.uploadRes = function(req, res){
    res.json({});
}

// Fetch profile img for the user
exports.image = function(req, res){
    fs.readFile("profile_imgs/"+req.params.filename, function(err, data){
        if(err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }

        else {
            res.writeHead(200);
            //res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
}

//Return an updated user in JSON based on the update parameters
exports.put = function(req, res){
    const user = Object.assign({}, req.body);
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    };

    user._id = req.params.id;
    userService.update(user)
        .then(resolve)
        .catch(renderErrorResponse(res));
}

//Return a user in JSON based on the search parameter
exports.get = function(req, res){
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    }

    userService.get(req.params.id)
        .then(resolve)
        .catch(renderErrorResponse(res));
};



//Return a list of users in JSON based on the search parameters
exports.list = function(req, res){
    const resolve = (users) => {
        res.status(200);
        res.json(users);
    };

    userService.search({})
        .then(resolve)
        .catch(renderErrorResponse(res));
}

//Delete and return the number of user successfully deleted
exports.delete = function(req, res){
    const resolve = (user) => {
        res.status(200);
        res.json(user);
    }

    userService.delete(req.params.id)
        .then(resolve)
        .catch(renderErrorResponse(res));
};


//Throw error if error object is present
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};