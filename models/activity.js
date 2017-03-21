const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	place_id: { type : String, required: 'Location place_id cannot be empty.', trim : true},
	name: { type : String, trim : true}
});

mongoose.model('Location', LocationSchema);

const ActivitySchema = new Schema({
	organizer: { type : String, required: 'Activity organizer cannot be empty.', trim : true }, // store the _id of the organizer
	title: { type : String, required: 'Acitivity title cannot be blank', trim : true },
	location: { type : String, default : null, trim : true }, // store the _id of the location
	time: { type : Date, default : null },
	type: { type : String, default : null, trim : true },
	description: { type : String, default : 'This Activity has no description', trim : true },
	expense: { type : Number, default : 0, min : 0 },
	status: { type : String, enum : ['future', 'going', 'finished', 'cancelled'], default : 'future' },
	rating: { type : Number, min : 0, max : 5, default : null },
	rated_participants: { type : [String], default : [] },
	content_for_participants: { type : String, default : null, trim : true },
	participation_method: { type : String, enum : ['public', 'approval', 'only_invite'], default : 'public' },
	remind_time: { type : Date, default : null },
	participants: { type : [String], default : [] },
	created_at: { type : Date, default : Date.now }
});

ActivitySchema.methods = {
	/**
	 * Create function:
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {doc} new activity
	 *   create a new activity
	 */
	Create: function(attr) {

	},

	/**
	 * Modify function:
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {bool} success or fail
	 */
	Modify: function(attr) {

	},

	/**
	 * Delete function:
	 *   @param {String} activity_id (the ObjectId of a activity)
	 *   @return {bool} success or fail
	 */
	Delete: function(activity_id) {

	},

	/** 
	 * AddParticipant function:
	 *   @param {String} user_id (ObjectId of a user)
	 *   @return {bool} success or fail
	 */
	AddParticipant: function(user_id) {

	},

	/**
	 * Rate function:
	 *   @param {String} rating (rating score [0, 1, 2, 3, 4, 5])
	 *   @return {bool} success or fail
	 */
	Rate: function(rating) {

	},
	

};

ActivitySchema.statics = {

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
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {[doc]} an array of activities
	 *   search for activities that fit the requirements
	 */
	Search: function(attr) {
		return new Array();
	},

	/**
	 * GetByUser function:
	 *   @param {JSON} user
	 *   @return {[doc]} an array of activities
	 *   get the activities joined by the given user
	 */
	GetByUser: function(user) {
		return new Array();
	},
};

mongoose.model('Activity', ActivitySchema);