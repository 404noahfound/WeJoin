const mongoose = require('mongoose');
const User = mongoose.model('User');
const only = require('only');
const flash = require('express-flash');

exports.Create = function(req, res){
	res.pageInfo.title = 'Register';
	res.pageInfo.error = req.flash('error');
	res.render('user/Create', res.pageInfo);
};

exports.LogIn = function(req, response){
	response.pageInfo.error_flash = req.flash('error');
	response.pageInfo.title = 'Log In';
	response.render('user/LogIn', response.pageInfo);
};

exports.UponCreate = function(req, res){
	res.pageInfo.title = "Reg success";
	res.pageInfo.functionality = "Reg success";
	const user = new User(only(req.body, "username password"));
	user.save().then(
		function(doc) {
			res.render('home/Functionality', res.pageInfo);
		}, 
		function(err) {
			err_messages = [];
			if (err.errors) {
				for (er in err.errors) {
					console.log(err.errors[er]);
					err_messages.push(err.errors[er].message);
				}}
			req.flash('error', err_messages);
			res.redirect('/user/reg');
		});
	// res.render('home/Functionality', res.pageInfo);
};

exports.Index = function(req, res){
	res.pageInfo = {title:"Users"};
	// User.find({}, function(err, docs){
	// 	res.pageInfo.users = docs;
	// 	res.render('user/Index', res.pageInfo);
	// });
	User.find({}).then(
		function(docs){
			res.pageInfo.users = docs;
			res.render('user/Index', res.pageInfo);
		}, function(err){

		});
};
