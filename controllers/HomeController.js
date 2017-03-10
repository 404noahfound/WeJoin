const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

exports.Index = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title = Activity.test();
    response.render('home/Index', response.pageInfo);
};
 
exports.Other = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};
