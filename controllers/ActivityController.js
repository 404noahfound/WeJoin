const mongoose = require('mongoose');
const only = require('only');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const RegUser = mongoose.model('RegUser');
const Guest = mongoose.model('Guest');
const Note = mongoose.model('Note');
const Notification = mongoose.model('Notification');
const Request = mongoose.model('Request');

exports.Search = function(request, response){
	response.pageInfo.keyword=request.body.keyword;
	response.pageInfo.resultActivities=Activity.Search(response.pageInfo.keyword);
	response.pageInfo.functionality = "Activity.Search. Generate page for relevant activitys"
	response.render('activity/Search', response.pageInfo);
};

exports.UponSearch = function(request, response){
	response.pageInfo.functionality = "Activity.UponSearch";
	response.render('home/Functionality',response.pageInfo);
};

exports.View = function(request, response){
	response.pageInfo.functionality = "Activity.View. Generate page for viewing activity"
	response.pageInfo.activityID=request.params.id;
	Activity.find({'_id':request.params.id},function(err,docs){
		response.pageInfo.activities=docs;
		response.render('activity/View',response.pageInfo);
	});
};

exports.UponView = function(request.response){
	response.pageInfo.functionality = "Activity.UponView."
	response.render('home/Functionality',response.pageInfo);
};

exports.Create = function(request, response){
	response.pageInfo.functionality = "Activity.Create. Generate create account page."
	response.render('activity/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo.functionality = "Activity.UponCreate"
	const activity = new Activity(only(request.body, "organizer title location time type description "
		+"expense status rating rated_participants content_for_participants participation_method remind_time "
		+"participants created_at"));
	activity.save();
	response.render('home/Functionality', response.pageInfo);
};

exports.CustomerModify = function(request, response){
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate"
	response.render('home/Functionality', response.pageInfo);
};

exports.OrganizerModify = function(request, response){
	response.pageInfo.title = "OrganizerModify"
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer."
	Activity.find({}, function(err, docs){
		response.pageInfo.activities = docs;
		response.render('activity/OrganizerModify', response.pageInfo);
	});
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo.functionality = "Activity.UponOrganizerModify";
	response.render('home/Functionality', response.pageInfo);
};

exports.GetActivityDescription = function(request, response){
	response.pageInfo.functionality = "Activity.GetActivityDescription. Generate page for activity description. "
	response.render('activity/GetActivityDescription',response.pageInfo);
};

exports.UponGetActivityDescription = function(request,response){
	response.pageInfo.functionality = "Activity.UponGetActivityDescription"
	response.render('home/Functionality', response.pageInfo);
};
