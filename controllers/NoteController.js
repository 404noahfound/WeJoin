const mongoose = require('mongoose');
const only = require('only');
const Note = mongoose.model('Note');
exports.Note = function(request, response){
	response.pageInfo.title = "Note";
	response.pageInfo.functionality = "Note. Generate page for options";
	Note.find({}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/Note', response.pageInfo);
	});
};

exports.UponNote = function(request, response){
	response.pageInfo.title = "Upon Note";
	response.pageInfo.functionality = "Note.View";
	response.render('home/Functionality', response.pageInfo);
};
exports.NoteSearch = function(request, response){
	response.pageInfo.title = "Note Search";
	response.pageInfo.functionality = "Note.Search. Generate search page.";
	response.render('note/Search', response.pageInfo);
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
	var id = request.params.id;
	response.pageInfo.id=id;
	Note.find({'_id':id}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/ViewEach', response.pageInfo);
	});
};

exports.NoteCreate = function(request, response){
	response.pageInfo.title = "Note Create";
	response.pageInfo.functionality = "Note.Create. Generate create Note editor page.";
	response.render('note/Create', response.pageInfo);
};

exports.UponNoteCreate = function(request, response){
	response.pageInfo.title = "Note Upon Create";
	response.pageInfo.functionality = "Note.UponCreate";
	const note = new Note(only(request.body, "title content"));
	note.save();
	response.render('note/Return', response.pageInfo);
};

exports.NoteModify = function(request, response){
	response.pageInfo.title = "Note Modify";
	response.pageInfo.functionality = "Note.Modify. Modify the content of the note.";
	Note.find({}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/Modify', response.pageInfo);
	});
};

exports.NoteModifyEach = function(request, response){
	var id = request.params.id;
	response.pageInfo.title="Note Modify Each";
	response.pageInfo.functionality = "Generate pages for each notes";
	response.pageInfo.id=id;
	Note.find({'_id':id}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/ModifyEach', response.pageInfo);
	});
};

exports.UponNoteModifyEach = function(request, response){
	var id = request.params.id;
	var new_content=request.body.content;
	response.pageInfo.title="Upon Modify Each";
	response.pageInfo.functionality = "Upon.Note.Modify";
	Note.findOneAndUpdate({'_id':id}, {'content':new_content}, {upsert:true}, function(err, doc){
		if(err) console.log('error!');
		response.pageInfo.description=new_content;
	});
	response.render('note/Return', response.pageInfo);
};

exports.NoteDelete = function(request, response){
	response.pageInfo.title = "Note Delete";
	response.pageInfo.functionality = "Note.Modify. Delete the note.";
	Note.find({}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/Delete', response.pageInfo);
	});
};

exports.NoteDeleteEach = function(request, response){
	var id = request.params.id;
	response.pageInfo.title="Note Delete Each";
	response.pageInfo.functionality = "Generate pages for each notes";
	response.pageInfo.id=id;
	Note.find({'_id':id}, function(err, docs){
		response.pageInfo.notes = docs;
		response.render('note/DeleteEach', response.pageInfo);
	});
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
