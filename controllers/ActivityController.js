const mongoose = require('mongoose');
const only = require('only');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
//const RegUser = mongoose.model('RegUser');
//const Guest = mongoose.model('Guest');
//const Note = mongoose.model('Note');
//const Notification = mongoose.model('Notification');
//const Request = mongoose.model('Request');

exports.Search = function(request, response){
	response.pageInfo.keyword = request.params.keyword;
	console.log(response.pageInfo.keyword)
	Activity.Search(response.pageInfo.keyword, function(res){
		response.pageInfo.activities = res;
		if (!response.pageInfo.activities) console.log("No Activity!")
		console.log(response.pageInfo.activities);
		response.pageInfo.functionality = "Activity.Search. Generate page for relevant activitys"
		response.render('activity/View', response.pageInfo);
	});
};

/*
exports.UponSearch = function(request, response){
	response.pageInfo.title = "Search Result"
	response.pageInfo.functionality = "Activity.UponSearch";
	response.render('activity/UponSearch',response.pageInfo);
};
*/

exports.View = function(request, response){
	response.pageInfo.title = "Activity Information"
	response.pageInfo.functionality = "Activity.View. Generate page for viewing activity"
	response.pageInfo.activityID = request.params.id;
	Activity.find({'_id':request.params.id},function(err,docs){
		if(err) console.log("Error! Can't find the activity page!");
		response.pageInfo.activities = docs;
		response.render('activity/View',response.pageInfo);
	});
};

exports.Create = function(request, response){
	response.pageInfo.title = "Create Activity";
	response.pageInfo.functionality = "Activity.Create. Generate create account page."
	response.render('activity/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo.title = "Create success!"
	response.pageInfo.functionality = "Create success!"
	const activity = new Activity();
	activity.Create(only(request.body, "organizer \
										title \
										location \
										time \
										type \
										description \
										expense \
										status \
										rating \
										rated_participants \
										content_for_participants \
										participation_method \
										remind_time \
										participants created_at"));
	response.render('activity/View', response.pageInfo);
};

exports.CustomerModify = function(request, response){
	response.pageInfo.title= "Customer Modify"
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate"
	response.render('activity/View',response.pageInfo);
};

exports.OrganizerModify = function(request, response){
	response.pageInfo.title = "OrganizerModify"
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer."
	Activity.find({'_id':request.params.id}, function(err, docs){
		if(err) console.log("Error! Can't find activity page for organizer to modify!")
		response.pageInfo.activities = docs;
		response.render('activity/OrganizerModify', response.pageInfo);
	});
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo.title= "Organizer modify success";
	response.pageInfo.functionality = "Activity.UponOrganizerModify";
	if(!Activity.modify(only(request.body, "organizer title location time type description "
		+"expense status rating rated_participants content_for_participants participation_method remind_time "
		+"participants created_at"))) console.log("Organizer modify failed!");

	response.render('activity/View', response.pageInfo);
};

/*
exports.AddParticipant = function(request, response){
	if(!Activity.AddParticipant(RegUser._id)) console.log("Add participant failed!");
	response.render('activity/View',response.pageInfo);
};
*/

/*
exports.GetByUser = function(request,response){
	response.pageInfo.title = "User's activities";
	response.pageInfo.activities=Activity.GetByUser(RegUser);
	if(!response.pageInfo.activities) console.log("User get activities failed!");
	response.render('activity/GetByUser',response.pageInfo);
};
*/
