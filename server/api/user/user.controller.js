/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  createUser
 * GET     /api/user/:id          ->  showUser
 * PUT     /api/user/:id          ->  updateUser
 * DELETE  /api/user/:id          ->  destroyUser
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');

module.exports.allUsers = function(req, res){	
		//User is a mongoose schema model
		//.find is a mongoose method that accepts a json to search mongodb as the first argument, and a callback function that can take err and res as arguments	
		User.find({})
			//.then is a promise method that fires after the previous method and fires whatever function you place inside
			//entity is the argument which catches the json object that is passed back from the mongodb query invoked by the .find method
			.then(function(entity) {
				//if we have the mongodb entity then we will send back the status 200 message and the json object 
				if(entity)
				res.status(200).json(entity)
			})
			//.catch will occur if one of the promises fails to do error handling
			.catch(function(){
				res.status(500).send({error: "Server did not get an entity response object from the database"})
			});

}

module.exports.createUser = function(req, res){

	User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});

	res.send(req.body);
}

module.exports.showUser = function(req, res){
	return 'showUser';
}

module.exports.updateUser = function(req, res){
	return 'updateUser';
}

module.exports.destroyUser = function(req, res){
	return 'destroyUser';
}