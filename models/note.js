const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");
const faker = require('faker');

const NoteSchema = new Schema({
	title: {
			type : String,
			required: [true, 'Please add a title.'], 
			trim : true },
	author:{
			type: Schema.Types.ObjectId},
	authorname:{
			type: String
	},
	note_type:{
			type: String,
			default: "activity"
	},
	short_description: {
			type: String,
			default : "This Note has no description",
			trim: true
	},
	content:{ 
			type : String, 
			default : 'This Note has no content', 
			trim : true},
	associated_activity: {
			type : Schema.Types.ObjectId,
			default: null},
	picture : { type :String, default: "/images/snowball.jpg"},
	created_at  : { type : Date, default : Date.now },
	modified_at : { type : Date, default : Date.now },
	highlighted: { type : Boolean, default : false }
});


NoteSchema.methods = {
	/**
	 * Create function:
	 *   @param {JSON} attr (attributes of a note)
	 *   @return {doc} new note
	 *   create a new note
	 */
	Create: function(attr) {
		return 0;
	},

	/**
	 * Modify function:
	 *   @param {JSON} attr (attributes of a note)
	 *   @return {bool} success or fail
	 */
	Modify: function(attr) {
		return 0;
	},

	/**
	 * Delete function:
	 *   @param {String} note_id (the ObjectId of a note)
	 *   @return {bool} success or fail
	 */
	Delete: function(note_id) {
		return 0;
	},


	

};

NoteSchema.statics = {

	/**
	 * test function description
	 * @return {String}
	 */
	test: function() {
		return 'this is a test string.'
	},

	list: function () {
		this.find({}, function(err, docs) {
			return docs;
		});
	},

	fake: function(num,user){
		var note_info = [];
		for(var i = 0; i < num; i++){
			var paragraphs="";
			for(var j=0 ; j<10; j++){
				if(j==4){
					var picture ="<p><img src="+faker.image.image()+"></p>"
					paragraphs=paragraphs.concat(picture);
				}
				var paragraph = "<p>"+ faker.lorem.sentences()+"</p>"
				console.log(paragraph)
				paragraphs= paragraphs.concat(paragraph);
				console.log(paragraphs)
			};
			note_info.push({
				title: faker.lorem.sentence(),
				author: user._id,
				authorname: user.username,
				content: paragraphs,
				short_description: faker.lorem.sentence(),
				picture : faker.image.image()
			});
		}
		this.create(note_info, function(err, users){
			if(err) console.log(err);
		});
		return note_info;
	},
	/**
	 * GetByUser function:
	 *   @param {JSON} user
	 *   @return {[doc]} an array of notes
	 *   get the notes written by the given user
	 */
	GetByUser: function(user) {
		return new Array();
	},

};

mongoose.model('Note', NoteSchema);
