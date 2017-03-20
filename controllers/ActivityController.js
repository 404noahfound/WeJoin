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
	response.pageInfo.functionality = "Activity.UponCreate"
	const activity = new Activity(only(request.body, "title description"));
	activity.save();
	response.render('home/Functionality', response.pageInfo);
};

exports.CustomerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate"
	response.render('home/Functionality', response.pageInfo);
};

exports.OrganizerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title="OrganizerModify"
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer."
	Activity.find({}, function(err, docs){
		response.pageInfo.activities = docs;
		response.render('activity/OrganizerModify', response.pageInfo);
	});
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.title="OrganizerModify"
	response.pageInfo.functionality = "Activity.Modify"
	response.render('home/Functionality', response.pageInfo);
};

exports.OrganizerModifyActivity = function(request, response){
	var id = request.params.id;
	response.pageInfo = {};
	response.pageInfo.title="OrganizerModifyActivity"
	response.pageInfo.id=id;
	response.pageInfo.functionality = "Activity.OrganizerModifyActivity. Generate page for each activity."
	Activity.find({'_id':id}, function(err, docs){
		response.pageInfo.activities = docs;
		response.render('activity/OrganizerModifyActivity', response.pageInfo);
	});
};

exports.UponOrganizerModifyActivity = function(request, response){
	var id = request.params.id;
	var new_description=request.body.description
	response.pageInfo = {};
	response.pageInfo.title="UponOrganizerModifyActivity"
	response.pageInfo.functionality = "Activity.Modify"
	Activity.findOneAndUpdate({'_id':id}, {'description':new_description}, {upsert:true}, function(err, doc){
		if(err) console.log('error!');
		response.pageInfo.description=new_description;
	});
	console.log("hello");
	response.render('home/Functionality', response.pageInfo);
};