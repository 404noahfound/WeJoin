const mongoose = require('mongoose');
const only = require('only');
const Notification = mongoose.model('Notification');



exports.NotificationResponse = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('notification/Create', response.pageInfo);
};

exports.UponNotificationResponse = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};