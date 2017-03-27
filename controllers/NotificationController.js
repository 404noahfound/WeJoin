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
export.Create = function(request,response){
	response.pageInfo.title = "Write Notification";
	response.pageInfo.error = request.flash('error');
	response.render('notification/Create',response.pageInfo);
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
export.UponCreate = function(request,response){
	response.pageInfo.title='Send Success';
	response.pageInfo.functionality="Notification.UponCreate";
	console.log(request.body);
	const notification=new Notification();
	notification.Create(only(request.body, "receiver, description"));
	response.render('notification/View',response.pageInfo);
}


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
export.Delete = function(request,response){
	response.pageInfo.functionality='Notification.Delete';
	Notification.Delete();
	response.render('notification/View',response.pageInfo);
} 


/**
 * MarkAsUnread
 *
 *Once mark this notification as unread, return to page of all notificaitons;
 * @class      MarkAsUnread (name)
 * @param      {<type>}  request   The request
 * @param      {<type>}  response  The response
 * @author      Tim
 */
export.MarkAsUnread = function(request,response){
	response.pageInfo.functionality='Notification.MarkAsUnread';
	Notification.MarkAsUnread();
	response.render('notification/View',response.pageInfo);
}

export.View = function(request,response){
	response.pageInfo.title="Notifications Info";
	Notification.find({ '_id': request.params.id }).then(
		function(docs){
			response.pageInfo.notifications = docs;
			response.render('notification/ViewSingle',response.pageInfo);
		},
		function(err){
			console.log("View norification Error!");
			response.render('home/Other',response.pageInfo);
		});

}