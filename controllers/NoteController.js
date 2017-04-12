const mongoose = require('mongoose');
const only = require('only');
const Note = mongoose.model('Note');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const flash = require('express-flash');

exports.Note = function(request, response){
	response.pageInfo.title = "Note";
	response.pageInfo.functionality = "Note. Generate page to view my notes";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
		Note.find({'author': request.user._id },
			function(err, docs){
			if (err) {
				console.log("Error! Can't find notes of current user!");
			}
			else {
				response.pageInfo.notes = docs;
				console.log(docs);
				response.render('note/Note', response.pageInfo);
			}
		});
	}
};

exports.NoteUser = function(request, response){
	response.pageInfo.title = "Note User";
	response.pageInfo.functionality = "Note User. Generate page to view user's notes";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
		Note.find({'author': request.params.id },
			function(err, docs){
			if (err) {
				console.log("Error! Can't find notes of the user!");
			}
			else {
				response.pageInfo.notes = docs;
				response.render('note/Note', response.pageInfo);
			}
		});
	}
};


exports.NoteSearch = function(request, response){
	response.pageInfo.title = "Note Search";
	response.pageInfo.functionality = "Note.Search. Generate search page.";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{response.render('note/Search', response.pageInfo);}
};

exports.UponNoteSearch = function(request, response){
	response.pageInfo.functionality = "UponNote.Search. Generate page for relevant notes";
	var attr = request.body;
	attr.title = {$regex: attr.title};
	Note.find(attr,
		function(err, res){
			if(err){
				console.log("Search note Error!");
				response.pageInfo.note = new Array();
			}
			else response.pageInfo.notes = res;
			response.render('note/SearchResult', response.pageInfo);
		});
};

exports.NoteViewEach = function(request, response){
	response.pageInfo.title = "Note View";
	response.pageInfo.functionality = "Note.View";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		var id = request.params.id;
		response.pageInfo.id=id;
		Note.findOne({'_id':id}, function(err, docs){
			response.pageInfo.note = docs;
			Activity.findOne({'_id': docs.associated_activity}, function(err, docss){
				response.pageInfo.user=request.user;
				response.pageInfo.activity = docss;
				if(docss){
					User.findOne({'_id': docss.organizer}, function(err, docsss){
						response.pageInfo.activity.organizer_info=docsss;
						if(String(docs.author)==String(request.user._id)) 
							response.pageInfo.auth = 1;
						else response.pageInfo.auth = 0;
						response.render('note/ViewEach', response.pageInfo);
					});
				}
				else{
						if(String(docs.author)==String(request.user._id)) 
							response.pageInfo.auth = 1;
						else response.pageInfo.auth = 0;
						response.render('note/ViewEach', response.pageInfo);
				}
			});
		});
	}
};

exports.NoteCreate = function(request, response){
	response.pageInfo.title = "Note Create";
	response.pageInfo.functionality = "Note.Create. Generate create Note editor page.";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
		response.render('note/Create', response.pageInfo);
	}
};

exports.UponNoteCreate = function(request, response){
	response.pageInfo.title = "Note Upon Create";
	response.pageInfo.functionality = "Note.UponCreate";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
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
		request.body.author = request.user._id;
		request.body.authorname = request.user.username;
		console.log(request.body);
		const note = new Note(only(request.body, "title author content authorname note_type short_description picture"));
		console.log(request.body);
		note.save();
		response.render('note/Return', response.pageInfo);
	}
};

exports.NoteRelatedCreate = function(request, response){
	response.pageInfo.title = "Note Create";
	response.pageInfo.functionality = "Note.Create. Generate create Note editor page.";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
		response.render('note/Create', response.pageInfo);
	}
};

exports.UponNoteRelatedCreate = function(request, response){
	response.pageInfo.title = "Note Upon Create";
	response.pageInfo.functionality = "Note.UponCreate";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else {
		request.body.associated_activity = request.params.activityid;
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
		request.body.author = request.user._id;
		request.body.authorname = request.user.username;
		console.log(request.body);
		const note = new Note(only(request.body, "title author content authorname note_type short_description picture"));
		console.log(request.body);
		note.save();
		response.render('note/Return', response.pageInfo);
	}
};

exports.NoteModify = function(request, response){
	response.pageInfo.title = "Note Modify";
	response.pageInfo.functionality = "Note.Modify. Modify the content of the note.";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Note.find({'author': request.user._id },
			function(err, docs){
				if (err) {
					console.log("Error! Can't find notes of current user!");
				}
				else {
					response.pageInfo.notes = docs;
					response.render('note/Modify', response.pageInfo);
				}
			});
	}
};

exports.NoteModifyEach = function(request, response){
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		var id = request.params.id;
		response.pageInfo.user=request.user;
		response.pageInfo.title="Note Modify Each";
		response.pageInfo.functionality = "Generate pages for each notes";
		response.pageInfo.id=id;
		Note.findOne({'_id':id}, function(err, docs){
			response.pageInfo.note = docs;
			response.render('note/ModifyEach', response.pageInfo);
		});
	}
};

exports.UponNoteModifyEach = function(request, response){
	var id = request.params.id;
	var new_content=request.body.content;
	var new_description= request.body.short_description;
	var new_title= request.body.title;
	var new_picture = request.body.picture;
	response.pageInfo.title="Upon Modify Each";
	response.pageInfo.functionality = "Upon.Note.Modify";
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
	Note.findOneAndUpdate({'_id':id}, { $set :{'content': new_content , 'title': new_title ,
		"picture": new_picture, "short_description":new_description } 
		, $currentDate:{'modified_at': 'date'}},
	 function(err, doc){
		if(err) console.log('error!');
		response.pageInfo.description=new_content;
	});
	response.render('note/Return', response.pageInfo);
};

exports.NoteDelete = function(request, response){
	response.pageInfo.title = "Note Delete";
	response.pageInfo.functionality = "Note.Modify. Delete the note.";
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		Note.find({'author': request.user._id },
			function(err, docs){
				if (err) {
					console.log("Error! Can't find notes of current user!");
				}
				else {
					response.pageInfo.notes = docs;
					response.render('note/Delete', response.pageInfo);
				}
			});
	}
};

exports.NoteDeleteEach = function(request, response){
	if (!request.user) {
		response.redirect('/user/login');
	}
	else{
		var id = request.params.id;
		response.pageInfo.title="Note Delete Each";
		response.pageInfo.functionality = "Generate pages for each notes";
		response.pageInfo.id=id;
		Note.findOne({'_id':id}, function(err, docs){
			response.pageInfo.note = docs;
			response.render('note/DeleteEach', response.pageInfo);
		});
	}
};

exports.UponNoteDeleteEach = function(request, response){
	var id = request.params.id;
	response.pageInfo.title="Upon Delete Each";
	response.pageInfo.functionality = "Upon.Note.Delete";
	Note.findByIdAndRemove({'_id':id}, function(err, docs){
		if(err) console.log('error!');
		response.render('note/Return', response.pageInfo);
	});
};

exports.DeleteAll = function(request, response){
	response.pageInfo.title="DeleteAll";
	response.pageInfo.functionality = "Delete all notes";
	id=request.user._id;
	Note.find({'author': id},function(err, docs){
		if(err) console.log('error!');
		response.redirect('/');
	}).remove().exec();
};