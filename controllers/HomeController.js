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
		User.find({_id: req.user._id}).then(
			function(docs){
				res.pageInfo.docs = docs;
				res.render('user/View', res.pageInfo);
			},
			function(err){
			}
		);
	} else {
		res.redirect('/user/login');
	}
};
 
exports.Other = function(request, response){
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};