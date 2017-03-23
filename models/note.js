const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	title: {
			type : String,
			required: [true, 'Please add a title.'], 
			trim : true },
	author:{
			type: String,
			default: '',
			trim : true},
	content:{ //***********************************need to change******************
			type : String, 
			default : 'This Note has no content', 
			trim : true},
	assocalated_activity: {
			type:  [String],
			default: [], },

	created_at  : { type : Date, default : Date.now },
	modified_at : { type : Date, default : Date.now },
	highlighted: { type : Boolean, deault : false }
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

	/**
	 * search function:
	 *   @param {JSON} attr (attributes of a note)
	 *   @return {[doc]} an array of activities
	 *   search for activities that fit the requirements
	 */
	Search: function(attr) {
		return new Array();
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