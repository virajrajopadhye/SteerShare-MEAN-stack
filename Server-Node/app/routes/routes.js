'use strict';

module.exports = function(app){
    const userController = require('../controllers/userController');
    const postController = require('../controllers/postController');
    const carController = require('../controllers/carController');
    const rideController = require('../controllers/rideController');
    const chatController = require('../controllers/chatController')

    app.route('/user/:id')
        .get(userController.get) //Fetch one user
        .put(userController.put) //Update one user
        .delete(userController.delete); //Delete one user

    app.route('/posts/:id')
        .get(postController.get); //Fetch single post

    app.route('/posts')
        .get(postController.search) //Fetch one post
        .post(postController.post); 
    
    app.route('/posts/user/:username')
        .get(postController.getUserPosts);

    app.route('/users/authenticate')
        .post(userController.authenticate); // Log in an User
    
    app.route('/users/register')
        .post(userController.register); // Register a user
    
    app.route('/users/uploadProfileImage')
        .post(userController.upload, userController.uploadRes); // User upload profile img
    
    app.route('/users/profileImg/:filename')
        .get(userController.image); // Fetch user profile img

    app.route('/cars')
        .post(carController.add) //Add cars
        .put(carController.update); //Update cars
    
    app.route('/cars/:id')
        .get(carController.get); //Get particular car

    app.route('/rides')
        .post(rideController.add); //Add ride

   

    app.route('/rides/:id')
        .get(rideController.get) //Fetch one booking
        .delete(rideController.delete); //Delete one booking

    app.route('/rides/user/:username') 
        .get(rideController.getUserRides); //Fetch user booking

    app.route('/chat')
    .post(chatController.post);

    app.route('/chat/:name')
        .get(chatController.get);

    app.route('/chat/:room')
        .get(chatController.getroom);

  
    
};