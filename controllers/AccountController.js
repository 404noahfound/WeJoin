const mongoose = require('mongoose');
const only = require('only');
const Account = mongoose.model('Account');

exports.Show = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Show. Generate the account"
	Account.find({}, function(err, docs){
		response.pageInfo.accounts = docs;
		response.render('account/Show', response.pageInfo);
	});
};
exports.Create = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponCreate"
	const account = new Account(only(request.body, "username password note"));
	account.save();
	response.render('home/Functionality', response.pageInfo);
};

exports.Modify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.username="Modify"
	response.pageInfo.functionality = "Account.Modify. Generate page for modifying the account."
	Account.find({}, function(err, docs){
		response.pageInfo.accounts = docs;
		response.render('account/Modify', response.pageInfo);
	});
};

exports.UponModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.username="UponModify"
	response.pageInfo.functionality = "Account.Modify"
	response.render('home/Functionality', response.pageInfo);
};


exports.ModifyAccount = function(request, response){
	var id = request.params.id;
	response.pageInfo = {};
	response.pageInfo.username="ModifyAccount"
	response.pageInfo.id=id;
	response.pageInfo.functionality = "Account.OrganizerModify. Generate page for modifying the account."
	Account.find({'_id':id}, function(err, docs){
		response.pageInfo.accounts = docs;
		response.render('account/ModifyAccount', response.pageInfo);
	});
};

exports.UponModifyAccount = function(request, response){
	var id = request.params.id;
	var new_password=request.body.password
	response.pageInfo = {};
	response.pageInfo.username="UponModifyAccount"
	response.pageInfo.functionality = "Account.Modify"
	Account.findOneAndUpdate({'_id':id}, {'password':new_password}, {upsert:true}, function(err, doc){
		if(err) console.log('error!');
		response.pageInfo.password=new_password;
	});
	console.log("hello");
	response.render('home/Functionality', response.pageInfo);
};

exports.Signin = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/Signin', response.pageInfo);
};

exports.UponSignin = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

exports.Signout = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/Signin', response.pageInfo);
};

exports.UponSignout = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

exports.Guest = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/guest', response.pageInfo);
};

exports.UponGuest = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

exports.Reguser = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/reguser', response.pageInfo);
};

exports.UponReguser = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

exports.Follow = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/reguser', response.pageInfo);
};

exports.UponFollow = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

exports.Recommondation = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('account/reguser', response.pageInfo);
};

exports.UponRecommondation = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.Notification = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('notification/show', response.pageInfo);
};

exports.UponNotification = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.NotificationCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('notification/create', response.pageInfo);
};

exports.UponNotificationCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.NotificationDelete = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('notification/delete', response.pageInfo);
};

exports.UponNotificationDelete = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};

//note
exports.Note = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('note/show', response.pageInfo);
};

exports.UponNote = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.NoteCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('note/create', response.pageInfo);
};

exports.UponNoteCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.NoteModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('note/modify', response.pageInfo);
};

exports.UponNoteModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};
exports.NoteDelete = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('notification/delete', response.pageInfo);
};

exports.UponNoteDelete = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};