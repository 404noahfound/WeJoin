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
	attr = Activity.SearchForm(attr);
	console.log(attr);
	console.log("Activity.Search");
	Activity.find(attr,
		function(err, docs){
			if(err){
				console.log("Find (Search) activity Error!");
				response.pageInfo.activities = new Array();
			}
			else response.pageInfo.activities = docs;
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
			console.log(docs);
			response.pageInfo.activities = docs;
			response.render('activity/ViewSingle',response.pageInfo);
		},
		function(err){
			console.log("Find (View) activity Error!");
			response.render('home/Other',response.pageInfo);
		});
};

exports.Create = function(request, response){
	response.pageInfo.functionality = "Activity.Create. Generate create account page.";
	response.pageInfo.title = "Create Activity";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		response.render('activity/Create', response.pageInfo);
	}
};

exports.UponCreate = function(request, response){
	response.pageInfo.functionality = "Create Activity";
	response.pageInfo.title = "Create Activity";
	console.log(request.body);
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		request.body.organizer = request.user._id;
		var activity = new Activity(only(request.body, "organizer " +
														"title " +
														"location_id " +
														"location_name " +
														"time " +
														"type " +
														"description " +
														"expense " +
														"status " +
														"content_for_participants " +
														"participation_method " +
														"remind_time " +
														"created_at"));
		activity.save().then(
			function(doc){
				console.log(activity);
				response.pageInfo.activities = new Array(activity);
				response.redirect('/activity/' + activity._id);
			},
			function(err){
				console.log("Create activity Error!\n" + err);
				response.render('home/Other',response.pageInfo);
			});
	}
};

exports.CustomerModify = function(request, response){
	response.pageInfo.functionality = "Activity.CustomerModify. Include Join/Quit/Rate";
	response.pageInfo.title = "Customer Modify";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Activity.find({ '_id': request.params.id }).then(
			function(docs){
				if(docs.length == 0){
					console.log("CustomerModify activity Error! No such activity!");
					response.render('home/Other',response.pageInfo);					
				}
				else{
					activity = docs[0];
					activity.Modify(request.user, request.body,
						function(err){
							if(err){
								console.log("CustomerModify activity Error!\n" + err);
								response.render('home/Other',response.pageInfo);
							}
							else{
								response.pageInfo.activities = new Array(activity);
								response.redirect('/activity/' + activity._id);
							}
						});
				}
			},
			function(err){
				console.log("Find (CustomerModify) activity Error!");
				response.render('home/Other',response.pageInfo);
			});
	}
};

exports.OrganizerModify = function(request, response){
	response.pageInfo.functionality = "Activity.OrganizerModify. Generate page for modifying the activity by organizer.";
	response.pageInfo.title = "OrganizerModify";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Activity.find({ '_id': request.params.id, 'organizer': request.user._id },
			function(err, docs){
				if (err) {
					console.log("Error! Can't find activity organized by current user!");
				}
				else {
					response.pageInfo.activities = docs;
					response.render('activity/OrganizerModify', response.pageInfo);
				}
			});
	}
};

exports.UponOrganizerModify = function(request, response){
	response.pageInfo.functionality = "Activity.UponOrganizerModify";
	response.pageInfo.title= "Organizer modify success";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Activity.find({ '_id': request.params.id, 'organizer': request.user._id }).then(
			function(docs){
				if(docs.length == 0){
					console.log("Error! Can't find activity organized by current user!");
					response.render('home/Other',response.pageInfo);					
				}
				else{
					activity = docs[0];
					activity.Modify(request.user, only(request.body, "title " +
																	"location_id " +
																	"location_name " +
																	"time " +
																	"type " +
																	"description " +
																	"expense " +
																	"status " +
																	"content_for_participants " +
																	"participation_method " +
																	"remind_time " +
																	"new_participants " +
																	"removed_participants"
																	),
						function(err){
							if(err){
								console.log("OrganizerModify activity Error!\n" + err);
								response.render('home/Other',response.pageInfo);
							}
							else{
								response.pageInfo.activities = new Array(activity);
								response.redirect('/activity/' + activity._id);
							}
						});
				}
			},
			function(err){
				console.log("Find (OrganizerModify) activity Error!");
				response.render('home/Other',response.pageInfo);
			});
	}
};

exports.DeleteAll = function(req, res){
	Activity.remove({},function(err){
		if (err) res.json(err);
		else res.redirect('/');
	});
};

/*
exports.AddParticipant = function(request, response){
	if(!Activity.AddParticipant(RegUser._id)) console.log("Add participant failed!");
	response.render('activity/View',response.pageInfo);
};
*/

// for test
exports.GetByUser = function(request, response){
	response.pageInfo.title = "User's activities";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Activity.GetByUser(request.user,
			function(docs){
				response.json(docs);
			});
	}
};

