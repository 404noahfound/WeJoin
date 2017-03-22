const mongoose = require('mongoose');
const User = mongoose.model('User');
const only = require('only');
const flash = require('express-flash');

exports.Create = function(req, res){
	res.pageInfo.title = 'Register';
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
	user.save();
	res.render('home/Functionality', res.pageInfo);
};

exports.Index = function(req, res){
	res.pageInfo = {title:"Users"};
	User.find({}, function(err, docs){
		res.pageInfo.users = docs;
		res.render('user/Index', res.pageInfo);
	});
};
