const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.Index = function(req, res){
	res.pageInfo.title = 'HomePage';
	Activity.find({}, function(err, docs){
		res.pageInfo.activities = docs;
		res.render('home/Index', res.pageInfo);
	});
};
 
exports.Other = function(request, response){
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};