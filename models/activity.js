const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
	organizer: { type : String, required: 'Activity organizer cannot be empty.', trim : true }, // store the _id of the organizer
	title: { type : String, required: 'Acitivity title cannot be blank', trim : true },
	location_id: { type : String, trim : true}, // store the google API place_id of the location
	location_name: { type : String, trim : true},
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
	Create: function(attr, callback) {
		console.log("activity.Create");
		for(var key in attr) this[key] = attr[key];
		console.log(attr);
		console.log(this);
		this.save(function(err){
			callback(err);
		});
	},

	/**
	 * Modify function:
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {bool} success or fail
	 */
	Modify: function(attr) {
		console.log("activity.Modify");
	},

	/**
	 * Delete function:
	 *   @param {String} activity_id (the ObjectId of a activity)
	 *   @return {bool} success or fail
	 */
	Cancel: function(activity_id) {
		console.log("activity.Cancel");
	},

	/** 
	 * AddParticipant function:
	 *   @param {String} user_id (ObjectId of a user)
	 *   @return {bool} success or fail
	 */
	AddParticipant: function(user_id) {
		console.log("activity.AddParticipant");
	},

	/**
	 * Rate function:
	 *   @param {String} rating (rating score [0, 1, 2, 3, 4, 5])
	 *   @return {bool} success or fail
	 */
	Rate: function(rating) {
		console.log("activity.Rate");
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

	/**
	 * search function:
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {[doc]} an array of activities
	 *   search for activities that fit the requirements
	 */
	Search: function(attr, callback) {
		console.log("Activity.Search");
		this.find(attr, function(err, docs){
			callback(err, docs);
		});
	},

	/**
	 * GetByUser function:
	 *   @param {JSON} user
	 *   @return {[doc]} an array of activities
	 *   get the activities joined by the given user
	 */
	GetByUser: function(user) {
		console.log("Activity.GetByUser");
	},
};

mongoose.model('Activity', ActivitySchema);