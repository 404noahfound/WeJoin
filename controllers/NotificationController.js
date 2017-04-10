const mongoose = require('mongoose');
const User = mongoose.model('User');
const only = require('only');
const flash = require('express-flash');
const Notification = mongoose.model('Notification');


/**
 * Create page for User
 *
 * @class      Create (name)
 * @param      {<type>}  request   The request
 * @param      {<type>}  response  The response
 * author     Tim
 */
exports.Create = function(request,response){
	response.pageInfo.title = "Create Notification";
	console.log("Create notification");
	response.pageInfo.error = request.flash('error');
	console.log(request.body);
	if(!request.user)
	{
		response.redirect('/user/login');
	}
	else{
		response.render('notification/Create',response.pageInfo);
	}
	
};

/**
 * UponCreate:
 *
 *return to the page viewing all notifications
 * @class      UponCreate (name)
 * @param      {<type>}  request  The request
 * @param      {<type>}  response The response
 * author     Tim
 */
exports.UponCreate = function(request,response){
	response.pageInfo.title='Send Success';
	response.pageInfo.functionality="Notification.UponCreate";
	console.log(request.body);
	if(!request.user){
		response.redirect('/user/login');
	}
	else{
		request.body.sender = request.user._id;
		var notification=new Notification(only(request.body, "sender" +
			                                                "receiver"+
			                                                "description"+
			                                                "status"+
			                                                "created_at"));
		notification.save().then(
			function(doc){
				console.log(notificaiton);
				response.pageInfo.notifications = new Array(notification);
				response.redirect('/activity'+activity.id);
			},
			function(err){
				console.log("Create notification error!"+err);
				response.render('home/Other',response.pageInfo);
			});
	}
};


/**
 *  * 
 * Delete a notification
 * 
 * this function is implemented at single notification pge
 * @class      Delete (name)
 * @param      {<type>}  request   The request
 * @param      {<type>}  response  The response
 * @author     Tim
 */
exports.Delete = function(request,response){
	response.pageInfo.functionality='Notification.Delete';
	Notification.Delete();
	response.render('notification/View',response.pageInfo);
}; 

exports.DeleteAll = function(request,response){
	Notification.remove({},function(err){
		if (err) response.json(err);
		else response.redirect('/');
	});
};

/**
 * MarkAsUnread
 *
 *Once mark this notification as unread, return to page of all notificaitons;
 * @class      MarkAsUnread (name)
 * @param      {<type>}  request   The request
 * @param      {<type>}  response  The response
 * @author      Tim
 */
exports.MarkAsUnread = function(request,response){
	response.pageInfo.functionality='Notification.MarkAsUnread';
	Notification.MarkAsUnread();
	response.render('notification/View',response.pageInfo);
};

exports.View = function(request,response){
	response.pageInfo.title="Notifications Info";
	console.log("In View function");
	Notification.find({ '_id': request.params.id }).then(
		function(docs){
			consele.log(docs);
			response.pageInfo.notifications = docs;
			response.render('notification/ViewSingle',response.pageInfo);
		},
		function(err){
			console.log("View norification Error!");
			response.render('home/Other',response.pageInfo);
		});

};