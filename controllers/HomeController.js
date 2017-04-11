const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');


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
	if(req.params.type == 'user') res.json(User.fake(req.params.num));
	else if(req.params.type == 'activity'){
		User.findOne({id: req.user._id}).exec()
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
 
exports.Other = function(request, response){
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};