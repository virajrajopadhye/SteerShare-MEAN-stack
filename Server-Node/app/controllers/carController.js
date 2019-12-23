'use strict';

//Import specific operations to database
const carService = require('../services/carServices');

//Add a car to a user
exports.add = function(req, res){
    const newCar = Object.assign({}, req.body);
    const resolve = (car) => {
        res.status(200);
        res.json(car);
    };

    carService.add(newCar)
        .then(resolve)
        .catch(renderErrorResponse(res));
};

//Get the car information
exports.get = function(req, res){
    const resolve = (car) => {
        res.status(200);
        res.json(car);
    }

    carService.get(req.params.id)
        .then(resolve)
        .catch(renderErrorResponse(res));

};

//Update car information
exports.update = function(req, res){
    const newCar = Object.assign({}, req.body);
    const resolve = (car) => {
        res.status(200);
        res.json(car);
    };

    carService.update(newCar)
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