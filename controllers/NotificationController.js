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
		for(participant in request.activity.participants){
		    var notification = new Notification({'title': request.activity.title, 'sender': request.user._id,'receiver': participant._id,'activity': request.activity._id});
		
		    notification.save().then(
			    function(doc){
				    response.redirect('/notification/'+notification._id + '/write/');
			    },
			    function(err){
				    console.log("Create notification Error!\n"+ err);
				    response.render('home/Other',response.pageInfo);
			    }
		    );
	    }
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
	response.pageInfo.title="Notifications Information";
//    Notification.find({'_id': response.params.id}).then()
	console.log("In View function");
	console.log(request.user);

	Notification.find({ 'receiver': request.user._id }).then(
		function(docs){
			consele.log(docs);
			response.pageInfo.notifications = docs;
			if(!request.user){
				response.redirect('/user/login');
			}
		},
		function(err){
			console.log("View norification Error!");
			response.render('home/Other',response.pageInfo);
		});

};

exports.ViewSingle=function(request,response){
	response.pageInfo.title="Notifications Information";
	console.log("In ViewSingle function");

	Notification.find({ '_id': request.params.id }).then(
		function(docs){
			consele.log(docs);
			response.pageInfo.notifications = docs;
			if(!request.user){
				response.redirect('/user/login');
			}
			response.render('notification/ViewSingle',response.pageInfo);
		},
		function(err){
			console.log("View norification Error!");
			response.render('home/Other',response.pageInfo);
		});

};
