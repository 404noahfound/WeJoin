const mongoose = require('mongoose');
const only = require('only');
const Note = mongoose.model('Note');


exports.Search = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Note.Search"
	response.render('home/Functionality', response.pageInfo);
};

exports.View = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Note.View"
	response.render('home/Functionality', response.pageInfo);
};

exports.Create = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Note.Create. Generate create Note editor page."
	response.render('note/Create', response.pageInfo);
};

exports.UponCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Activity.UponCreate"
	const note = new Note(only(request.body, "title content"));
	note.save();
	response.render('home/Functionality', response.pageInfo);
};

exports.Modify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Note.Modify. Modify the content of the note."
	response.render('note/Modify', response.pageInfo);
};

exports.UponModify = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Note.UponModify."
	response.render('home/Functionality', response.pageInfo);
};
