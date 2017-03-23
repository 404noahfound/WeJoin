const mongoose = require('mongoose');
const User = mongoose.model('User');
const only = require('only');
const flash = require('express-flash');

/**
 * The create form for user
 * @request req.flash('error')
 * @author Su
 */
exports.Create = function(req, res){
	res.pageInfo.title = 'Register';
	res.pageInfo.error = req.flash('error');
	res.render('user/Create', res.pageInfo);
};

/**
 * @description log in page
 * @author Su
 */
exports.LogIn = function(req, response){
	response.pageInfo.error_flash = req.flash('error');
	response.pageInfo.title = 'Log In';
	response.render('user/LogIn', response.pageInfo);
};

/**
 * @description Handle the create form from user
 * @request req.body{username: String, password: String}
 * @pageInfo {functionality: String}
 * @flash error
 * @author Su
 */
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
			if (err.message) {
				err_messages.push(err.message);
			}
			if (err.errors) {
				for (er in err.errors) {
					// err_messages.push(err.errors[er].message);
				}}
			req.flash('error', err_messages);
			res.redirect('/user/reg');
		});
	// res.render('home/Functionality', res.pageInfo);
};

exports.Modify = function(req, res){
	if (!req.user) {
		res.redirect('/user/login');
	} else {
		res.pageInfo.title = "Modify User";
		res.pageInfo.error = req.flash('error');
		res.pageInfo.user = req.user;
		res.render('user/Modify', res.pageInfo);
	}
};

exports.UponModify = function(req, res){
	var updateInfo = User.purifyForm(req.body);
	res.json(updateInfo);
	User.update({_id: req.user._id}, updateInfo).then(
		function(docs) {
			res.json({message:'success', docs: docs});
		},
		function(err) {
			res.json(err);
		}
	);
};

exports.View = function(req, res){
	res.pageInfo.title = "User Info";
	// console.log(req.params);
	User.find({_id: req.params.id}).then(
		function(docs){
			res.pageInfo.docs = docs;
			res.render('user/View', res.pageInfo);
		},
		function(err){

		}
	);
	// res.render('user/View', res.pageInfo);
};

/**
 * @description List all users, this is only a page for debugging
 * @pageInfo user : [User]
 * @author Su
 */
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

exports.LogOut = function(req,res){
	req.logout();
	res.redirect('/');
};

exports.DeleteAll = function(req, res){
	User.remove({},function(err){
		if (err) res.json(err);
		else res.redirect('/user');
	});
};









