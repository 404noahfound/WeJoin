const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.Index = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title = 'HomePage';
	Activity.find({}, function(err, docs){
		response.pageInfo.activities = docs;
		response.render('home/Index', response.pageInfo);
	});
};
 
exports.Other = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};