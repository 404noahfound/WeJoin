const mongoose = require('mongoose');
const only = require('only');
const Activity = mongoose.model('Activity');


exports.Search = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.Search"
	response.render('home/Functionality', response.pageInfo);
};


exports.View = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.View"
	response.render('home/Functionality', response.pageInfo);
};

exports.Create = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.Create. Generate create account page."
	response.render('activity/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.UponCreate";
	const activity = new Activity(only(request.body, "title description"));
	activity.save();
	response.render('home/Functionality', response.pageInfo);
};

exports.CustomerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate";
	response.render('home/Functionality', response.pageInfo);
};

exports.OrganizerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer."
	response.render('home/Functionality', response.pageInfo);
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.Modify"
	response.render('home/Functionality', response.pageInfo);
};
