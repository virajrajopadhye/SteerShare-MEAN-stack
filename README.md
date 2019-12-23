# INFO6150 Final Project
# SteerShare- A carpooling app.
A MEAN application which lets you find a travel mate to ride with very easily

## Team: Script Magnets
* Jiachen Yu (yu.jiac@husky.neu.edu)
* Viraj Rajopadhye (rajopadhye.v@husky.neu.edu)
* Priyam Modi (Modi.Pri@husky.neu.edu)
* Harshit Mandada (mandada.h@husky.neu.edu)

## Project Overview

 ### Features: 
* Find a ride based on passengers parameters
* Offer a ride (User can offer a ride if he is travelling from X to Y place)
* Book a ride
* Search from-to location using Google Map / Map API
* Login/Register(with profile picture of specified dimensions)
* Payment using credit/debit card/ paypal
* Email confirmation of booking
* Chat between Driver and Passenger


### To Run the project
This project has two major parts, which are Angular client and Node server. It needs to be run SEPARATELY on different ports!
#### Client Angular
Change the working directory to the client folder
`cd Client-Angular`
Install all the dependencies
`npm install`
Start the angular server
`ng serve`

#### Server Node
Change the working directory to the server folder
`cd Server-Node`
Install all the dependencies
`npm install`
Start the angular server
`node server.js`

#### Tech Used
* MongoDB
* Node JS
* Express JS
* nodemailer
* Angular
* Bootstrap
* socket io


