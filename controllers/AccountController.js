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