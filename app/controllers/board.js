var mongoose = require('mongoose');
var Video = require('../models/Nerd');
var path = require('path');

module.exports.controller = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
        path.resolve('../../public/views/home.html');
		res.render('MainCtrl');
	});

};