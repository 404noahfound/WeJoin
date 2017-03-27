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
	response.pageInfo.functionality = "Activity.Search. Generate page for relevant activitys";
	var attr = request.params;
	attr.title = {$regex: attr.title};
	console.log(attr);
	Activity.Search(attr,
		function(err, res){
			if(err){
				console.log("Search activity Error!");
				response.pageInfo.activities = new Array();
			}
			else response.pageInfo.activities = res;
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
	response.pageInfo.functionality = "Activity.View. Generate page for viewing activity";
	response.pageInfo.title = "Activity Information";
	Activity.find({ '_id': request.params.id }).then(
		function(docs){
			response.pageInfo.activities = docs;
			response.render('activity/ViewSingle',response.pageInfo);
		},
		function(err){
			console.log("View activity Error!");
			response.render('home/Other',response.pageInfo);
		});
};

exports.Create = function(request, response){
	response.pageInfo.functionality = "Activity.Create. Generate create account page.";
	response.pageInfo.title = "Create Activity";
	response.render('activity/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo.functionality = "Create Activity";
	response.pageInfo.title = "Create Activity";
	console.log(request.body);
	var activity = new Activity();
	activity.Create(only(request.body, "organizer " +
										"title " +
										"location " +
										"time " +
										"type " +
										"description " +
										"expense " +
										"status " +
										"rating " +
										"rated_participants " +
										"content_for_participants " +
										"participation_method " +
										"remind_time " +
										"participants" +
										"created_at"),
		function(err){
			if(err){
				console.log("Create activity Error! " + err);
				response.render('home/Other',response.pageInfo);
			}
			else{
				response.pageInfo.activities = new Array(activity);
				response.render('activity/ViewSingle', response.pageInfo);
			}
		});
};

exports.CustomerModify = function(request, response){
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate";
	response.pageInfo.title = "Customer Modify";
	response.render('activity/ViewSingle',response.pageInfo);
};

exports.OrganizerModify = function(request, response){
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer.";
	response.pageInfo.title = "OrganizerModify";
	Activity.find({ '_id': request.params.id }, function(err, docs){
		if(err) console.log("Error! Can't find activity page for organizer to modify!");
		response.pageInfo.activities = docs;
		response.render('activity/OrganizerModify', response.pageInfo);
	});
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo.functionality = "Activity.UponOrganizerModify";
	response.pageInfo.title= "Organizer modify success";
	if(!Activity.modify(only(request.body, "organizer \
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
											participants \
											created_at")))
		console.log("Organizer modify failed!");
	response.render('activity/ViewSingle', response.pageInfo);
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
