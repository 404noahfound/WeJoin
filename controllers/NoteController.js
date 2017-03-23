const mongoose = require('mongoose');
const only = require('only');
const Note = mongoose.model('Note');



//note
exports.NoteCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.Create. Generate create account page."
	response.render('note/note', response.pageInfo);
};

exports.UponNoteCreate = function(request, response){
	response.pageInfo = {};
	response.pageInfo.functionality = "Account.UponSignin"
	response.render('home/Functionality', response.pageInfo);
};