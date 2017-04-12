	const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const Note = mongoose.model('Note');

exports.Index = function(req, res){
	res.pageInfo.title = 'HomePage';
	// Activity.find({}, function(err, docs){
	// 	res.pageInfo.activities = docs;
	// 	res.render('home/Index', res.pageInfo);
	// });
	if(req.user) {
		User.findById(req.user._id)
			.exec(function(err, user){
				user.getInfoForView(function(info){
					Object.assign(res.pageInfo, info);
					res.pageInfo.pp = 'My';
					res.render('user/View', res.pageInfo);
				});
			});
	} else {
		res.redirect('/user/login');
	}
};

exports.Fake = function(req,res){
	console.log(req.params);
	if(req.params.type == 'user') res.json(User.fake(req.params.num));
	else if (req.params.type == 'note'){
		res.json(Note.fake(req.params.num,req.user));
	}
	else if(req.params.type == 'activity'){
		var username = 'fds';
		if (req.user) username = req.user.username;
		User.findOne({username: req.user.username}).exec()
		.then(
			function(user){
				console.log('found user' + user._id);
				console.log('start fake activity.');
				return user.fakeActivity();
			}
		).then(
			function(activity){
				res.json(activity);
			},
			function(err){
				res.json(err);
			}
		);
	}
}

exports.Test = function(req, res){
	res.pageInfo.title = "Test";
	res.render('home/Test', res.pageInfo);
}

exports.Other = function(request, response){
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};