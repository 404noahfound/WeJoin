const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
	organizer: { type : Schema.Types.ObjectId, ref: 'User', required: 'Activity organizer cannot be empty.' }, // store the _id of the organizer
	title: { type : String, required: 'Acitivity title cannot be blank', trim : true },
	location_id: { type : String, trim : true }, // store the google API place_id of the location
	location_name: { type : String, trim : true },
	time: { type : Date, default : Date.now },
	type: { type : String, default : null, trim : true },
	description: { type : String, default : 'This Activity has no description', trim : true },
	expense: { type : Number, default : 0, min : 0 },
	status: { type : String, enum : ['future', 'going', 'finished', 'cancelled'], default : 'future' },
	rating: { type : Number, min : 0, max : 5, default : null },
	rated_participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	content_for_participants: { type : String, default : null, trim : true },
	participation_method: { type : String, enum : ['public', 'approval', 'only_invite'], default : 'public' },
	remind_time: { type : Date, default : null },
	participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	wait_for_approval: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	created_at: { type : Date, default : Date.now }
});


ActivitySchema.methods = {
	/**
	 * Modify function:
	 *   @param {JSON} attr (attributes of a activity)
	 *   @return {String} error messages
	 */
	Modify: function(user, attr, callback) {
		console.log("activity.Modify");
		console.log(attr);
		var err = null;
		// Join activity: input needs to have attr.join
		if (attr.join) {
			console.log("activity.Join");
			var i = this.participants.indexOf(user._id);
			if (i != -1) { err = "Already joined!"; callback(err); }
			else{
				if (this.participation_method == 'public') {
					this.participants.push(user._id);
					this.save().then(callback(err));
				}
				else if (this.participation_method == 'approval') {
					var j = this.wait_for_approval.indexOf(user._id);
					if (j != -1) { err = "Waiting for approval!"; callback(err); }
					else {
						this.wait_for_approval.push(user._id);
						this.save().then(callback(err));
					}
				}
				else { err = "Can only join by invitation!"; callback(err); }
			}
		}
		// Quit activity: input needs to have attr.quit
		else if (attr.quit) {
			console.log("activity.Quit");
			var i = this.participants.indexOf(user._id);
			if (i != -1) {
				this.participants.splice(i, 1);
				this.save().then(callback(err));
			}
			else{
				var j = this.wait_for_approval.indexOf(user._id);
				if (j != -1) {
					this.wait_for_approval.splice(j, 1);
					this.save().then(callback(err));
				}
				else { err = "Haven't joined!"; callback(err); }
			}
		}
		// Rate activity: input needs to have attr.rate
		else if (attr.rate) {
			console.log("activity.Rate");
			attr.rate = parseInt(attr.rate);
			if (this.rated_participants.indexOf(user._id) != -1) { err = "Have rated!"; callback(err); }
			else {
				if (this.rated_participants.length == 0) { this.rating = attr.rate; }
				else {
					this.rating = (this.rating * this.rated_participants.length + attr.rate) / (this.rated_participants.length + 1)
				}
				this.rated_participants.push(user._id);
				this.save().then(callback(err));
			}
		}
		// OrganizerModify: input attr contains the items that has to be modified (directly_modified_keys + 'new_participants' + 'removed_participants')
		else {
			console.log("activity.DirectlyModify");
			const directly_modified_keys = ["title", "location_id", "location_name", "time", "type ", "description",
								"expense", "status", "content_for_participants", "participation_method", "remind_time"];
			//attr = this.PurifyForm(attr); // ?????? what the fuck? why it can stuck here???
			console.log(attr);
			for (key in attr) {
				if (directly_modified_keys.indexOf(key) != -1) { this[key] = attr[key]; }
				else if (key == 'new_participants') {
					for (each in attr.new_participants) {
						var i = this.wait_for_approval.indexOf(each);
						this.wait_for_approval.splice(i, 1);
						this.participants.push(each);
					}
				}
				else if (key == 'removed_participants') {
					for (each in attr.removed_participants) {
						var i = this.participants.indexOf(each);
						this.participants.splice(i, 1);
					}
				}
			}
			this.save().then(callback(err));
		}
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
	 * PurifyForm function:
	 *   @param  {JSON} form
	 *   @return {JSON} purifiedForm
	 *   filter out all empty field
	 */
	PurifyForm: function(form) {
		var purifiedForm = {};
		for (field in form){
			console.log(field);
			if (form[field].length > 0) {
				purifiedForm[field] = form[field];
			}
		}
		return purifiedForm;
	},

	/**
	 * SearchForm function:
	 *   @param  {JSON} form
	 *   @return {JSON} processed form used for .find()
	 *   convert "title" and "description" to regular expressions
	 */
	SearchForm: function(form) {
		var searchForm = {};
		for (field in form){
			if (form[field].length > 0) {
				if (field == "title" || field == "description" || field == "location") {
					searchForm[field] = { $regex: "^" + form[field] + ".*" };
				}
				else if (field == "time_search_from" || field == "time_search_to");
				else {
					searchForm[field] = form[field];
				}
			}
		}
		if (form.time_search_from || form.time_search_to) {
			searchForm.time = {};
			if (form.time_search_from) {
				searchForm.time.$gte = new Date(form.time_search_from);
			}
			if (form.time_search_to) {
				searchForm.time.$lte = new Date(form.time_search_to);
			}
		}
		return searchForm;
	},

	/**
	 * GetByUser function:
	 *   @param {JSON} user
	 *   @return {[doc]} an array of activities
	 *   get the activities joined by the given user
	 */
	GetByUser: function(user, callback) {
		console.log("Activity.GetByUser");
		var res = { 'joined': [], 'wait_for_approval': [], 'organized': [] };
		this.find({ $or: [{'participants': user._id}, {'wait_for_approval': user._id}, {'organizer': user._id}] },
			function(err, docs){
				if (err) {
					console.log("Find (GetByUser) activity Error!");
				}
				else {
					for (var i = 0; i < docs.length; i++){
						var activity = docs[i];
						var j = activity.participants.indexOf(user._id);
						if (j != -1) {
							res.joined.push(activity);
						}
						j = activity.wait_for_approval.indexOf(user._id);
						if (j != -1) {
							res.wait_for_approval.push(activity);
						}
						if (activity.organizer.equals(user._id)) {
							res.organized.push(activity);
						}
					}
				}
				console.log(docs);
				console.log(user._id);
				callback(res);
			});
	},

	/**
	 * ToView function:
	 *   @param {JSON} user
	 *   @return {[doc]} an array of activities
	 *   get the activities joined by the given user
	 */
	ToView: function(activities, callback) {
		console.log("Activity.GetByUser");
		var res = { 'joined': [], 'wait_for_approval': [], 'organized': [] };
		this.find({ $or: [{'participants': user._id}, {'wait_for_approval': user._id}, {'organizer': user._id}] },
			function(err, docs){
				if (err) {
					console.log("Find (GetByUser) activity Error!");
				}
				else {
					for (var i = 0; i < docs.length; i++){
						var activity = docs[i];
						var j = activity.participants.indexOf(user._id);
						if (j != -1) {
							res.joined.push(activity);
						}
						j = activity.wait_for_approval.indexOf(user._id);
						if (j != -1) {
							res.wait_for_approval.push(activity);
						}
						if (activity.organizer.equals(user._id)) {
							res.organized.push(activity);
						}
					}
				}
				console.log(docs);
				console.log(user._id);
				callback(res);
			});
	}
};

mongoose.model('Activity', ActivitySchema);