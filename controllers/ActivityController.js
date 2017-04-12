const mongoose = require('mongoose');
const only = require('only');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const Note = mongoose.model('Note');
const flash = require('express-flash');

var ToView = function(activity, callback){
	User.getInfoForGuest(activity.participants,
		function(res){
			var res_list = new Array();
			for (var i = 0; i < activity.participants.length; i++) {
				res_list.push(res[activity.participants[i]]);
			}
			activity.participants_info = res_list;
			// console.log(res_list);
			User.getInfoForGuest(activity.wait_for_approval,
				function(res){
					var res_list = new Array();
					for (var i = 0; i < activity.wait_for_approval.length; i++) {
						res_list.push(res[activity.wait_for_approval[i]]);
					}
					activity.wait_for_approval_info = res_list;
					// console.log(res_list);
					User.getInfoForGuest([ activity.organizer ],
						function(res){
							activity.organizer_info = res[activity.organizer];
							// console.log(activity.organizer_info);
							Note.find({ 'associated_activity': activity._id },
								function(err, docs){
									if (err) {
										console.log(err);
									}
									activity.notes = docs;
									callback(activity);
								})
						});
				});
		});
};

exports.Search = function(request, response){
	response.pageInfo.functionality = "Activity.Search. Generate page for relevant activitys";
	var attr = request.body;
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
			response.pageInfo.activities.sort(function(a, b){
				if(b.start_time == null) return -1;
				else if(a.start_time == null) return 1;
				else return a.start_time.getTime() - b.start_time.getTime();
			});

			var user_id_list = new Array();
			for (var i = 0; i < response.pageInfo.activities.length; i++) {
				user_id_list.push(response.pageInfo.activities[i].organizer);
			}

			User.getInfoForGuest(user_id_list,
				function(res){
					for (var i = 0; i < response.pageInfo.activities.length; i++) {
						response.pageInfo.activities[i].organizer_info = res[response.pageInfo.activities[i].organizer];
						//console.log(response.pageInfo.activities[i].organizer_info);
					}
					// console.log(res);
					// console.log(user_id_list);
					//console.log(response.pageInfo.activities);
					response.render('activity/ViewList', response.pageInfo);				
				});
		});
};

exports.View = function(request, response){
	response.pageInfo.functionality = "Activity.View. Generate page for viewing activity";
	response.pageInfo.title = "Activity Information";
	Activity.find({ '_id': request.params.id }).then(
		function(docs){
			// console.log(docs);
			response.pageInfo.activity = docs[0];
			if (!request.user) {
				response.pageInfo.user_status = "guest";
			}
			else if (response.pageInfo.activity.IsOrganizer(request.user)) {
				response.pageInfo.user_status = "organizer";
			}
			else if (response.pageInfo.activity.IsParticipant(request.user)) {
				response.pageInfo.user_status = "participant";
			}
			else {
				response.pageInfo.user_status = "login";
			}
			console.log(response.pageInfo.user_status);

			ToView(docs[0],
				function(res){
					response.pageInfo.activity = res;
					response.render('activity/ViewSingle',response.pageInfo);
				});
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
		var activity = new Activity({'title': 'New Activity', 'organizer': request.user._id});
		activity.save().then(
			function(doc){
				// console.log(activity);
				response.redirect('/activity/' + activity._id + '/organizermodify');
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
						function(err, res){
							if(err){
								console.log("CustomerModify activity Error!\n" + err);
								res_json = { "err": err };
								response.json(res_json);
							}
							else{
								response.json(res);
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
					ToView(docs[0],
						function(res){
							response.pageInfo.activity = res;
							response.render('activity/OrganizerModify', response.pageInfo);
						});
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
		//console.log(request.file);
		if(request.file){
			var path = require('path');
			var appDir = path.dirname(require.main.filename);
			console.log(appDir);
			request.body.picture = request.file.path;
			var picture = path.join(appDir, request.body.picture);
			console.log(picture);
			var im = require('imagemagick');
			im.convert(
				// {srcPath: avatar, dstPath: updateInfo.avatar, width: 200, height: 200}, 
				[picture, '-resize', "256x256!", picture],
				function(err, stdout, stderr){
					if (err) throw err;
					console.log('resized new avatar to fit within 200x200px');
			})
		}
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
																	"start_time " +
																	"end_time " +
																	"type " +
																	"description " +
																	"expense " +
																	"status " +
																	"content_for_participants " +
																	"participation_method " +
																	"remind_time " +
																	"new_participants " +
																	"removed_participants " +
																	"picture"
																	),
						function(err, res){
							if(err){
								console.log("OrganizerModify activity Error!\n" + err);
								ToView(activity,
									function(res){
										response.pageInfo.activity = res;
										response.pageInfo.error = err;
										response.render('activity/OrganizerModify', response.pageInfo);

									});
							}
							else{
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
/*
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
*/

