const mongoose = require('mongoose');
const User = mongoose.model('User');
const Activity = mongoose.model('Activity');
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
	user.nickname = user.username;
	user.save().then(
		function(doc) {
			// res.render('home/Functionality', res.pageInfo);
			res.redirect('/user/login');
		}, 
		function(err) {
			err_messages = [];
			if (err.message) {
				err_messages.push(err.message);
			}
			if (err.errors) {
				for (er in err.errors) {
					err_messages.push(err.errors[er].message);
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
		res.pageInfo.title = "Modify My Profile";
		res.pageInfo.error = req.flash('error');
		res.pageInfo.user = req.user;
		res.render('user/Modify', res.pageInfo);
	}
};

exports.UponModify = function(req, res){
	var updateInfo = User.purifyForm(req.body);
	if(req.file){
		var path = require('path');
		var appDir = path.dirname(require.main.filename);
		updateInfo.avatar = req.file.path;
		var avatar = path.join(appDir, updateInfo.avatar);
		var im = require('imagemagick');
		im.convert(
			// {srcPath: avatar, dstPath: updateInfo.avatar, width: 200, height: 200}, 
			[avatar, '-resize', "256x256!", avatar],
			function(err, stdout, stderr){
				if (err) throw err;
				console.log('resized new avatar to fit within 200x200px');
		})
	}
	User.update({_id: req.user._id}, updateInfo).then(
		function(docs) {
			// res.json({message:'success', docs: docs});
			res.redirect('/user/Modify');
		},
		function(err) {
			req.flash('error', err);
			res.redirect('user/Modify');
		}
	);
};

exports.View = function(req, res){
	res.pageInfo.title = "User Info";
	User.findById(req.params.id)
	.exec(function(err, user){
		user.getInfoForView(function(info){
			// console.log(info);
			Object.assign(res.pageInfo, info);
			res.pageInfo.pp = 'His';
			res.render('user/View', res.pageInfo);
		});
	});
};

/**
 * @description List all users, this is only a page for debugging
 * @pageInfo user : [User]
 * @author Su
 */
exports.Index = function(req, res){
	res.pageInfo.title = "Users";
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

/**
 * all actions related to follow are sent to this action
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 * @req req.body{followee_id: String, [follow: int], [unfollow: int]}
 * @res json{followee_id: String, exist: int, hasFollow: int}
 */
exports.FollowActions = function(req, res){
	User.findById(req.user._id).exec(function(err, user) {
		if(req.body.followee_id){
			var res_json = {followee_id: followee_id, exist: 0, hasFollow: 0};
			var followee_id = req.body.followee_id;
			User.findById(followee_id).exec(function(err, followee){
				if (err) {
					res.json(res_json);
				} else {
					res_json.exist = 1;
					if(req.body.follow == 1){
						user.follow(followee, function(err, result){
							res_json.hasFollow = 1;
							res.json(res_json);
						});
					} else if(req.body.unfollow == 1){
						user.unfollow(followee, function(err, result){
							res_json.hasFollow = 0;
							res.json(res_json);
						});
					} else {
						res_json.hasFollow = user.hasFollow(followee);
						res.json(res_json);
					}
				}
			});
		}
	});
}

exports.GetUsersAPI = function(req, res){
	if (!req.body || !req.body.ids){
		res.json('error!');
	}
	else {
		User.find({_id: {$in: req.body.ids}}).then(function(err, users){
			if (err) {
				res.json('error!');
			} else{
				res.json(users);
			}
		});
	}
}








