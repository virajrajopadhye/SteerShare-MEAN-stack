'use strict';

//Import specific operations to database
const postService = require('../services/postServices');

//Create and return a new post in JSON based on the HTTP request
exports.post = function(req, res){
    const newPost = Object.assign({}, req.body);
    const resolve = (post) => {
        res.status(200);
        res.json(post);
    };

    postService.saveRide(newPost)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

//Return an updated post in JSON based on the update parameters
exports.put = function(req, res){
    const post = Object.assign({}, req.body);
    const resolve = (post) => {
        res.status(200);
        res.json(post);
    };

    post._id = req.params.id;
    postService.update(post)
        .then(resolve)
        .catch(renderErrorResponse(res));
}


exports.get = function(req, res){
    const resolve = (post) => {
        res.status(200);
        res.json(post);
    }

    postService.get(req.params.id)
        .then(resolve)
        .catch(renderErrorResponse(res));
};



//Return a post in JSON based on the search parameter
exports.search = function(req, res){
    const resolve = (posts) => {
        res.status(200);
        res.json(posts);
    }
    if(req.query.exact){
        postService.searchByExactDateTime(req.query)
                .then(resolve)
                .catch(renderErrorResponse(res));
    }
    else{
        if(req.query.travel_time){
            postService.searchByLocationAndTime(req.query)
                .then(resolve)
                .catch(renderErrorResponse(res));
        }
        else{
            postService.searchByLocation(req.query)
                .then(resolve)
                .catch(renderErrorResponse(res));
        }
    }
};

//Return a list of posts in JSON based on the search parameters
exports.list = function(req, res){
    const resolve = (posts) => {
        res.status(200);
        res.json(posts);
    };

    postService.search({})
        .then(resolve)
        .catch(renderErrorResponse(res));
}

//Delete and return the number of post successfully deleted
exports.delete = function(req, res){
    const resolve = (post) => {
        res.status(200);
        res.json(post);
    }

    postService.delete(req.params.id)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

exports.getUserPosts = function(req, res){
    const resolve = (posts) => {
        res.status(200);
        res.json(posts);
    }

    postService.searchUserPosts(req.params.username)
        .then(resolve)
        .catch(renderErrorResponse(res));
}


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