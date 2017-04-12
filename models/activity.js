const mongoose = require('mongoose');
const faker = require('faker');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
	organizer: { type : Schema.Types.ObjectId, ref: 'User', required: 'Activity organizer cannot be empty.' }, // store the _id of the organizer
	title: { type : String, required: 'Acitivity title cannot be blank', trim : true },
	location_id: { type : String, trim : true }, // store the google API place_id of the location
	location_name: { type : String, trim : true, default : "" },
	start_time: { type : Date, default : Date.now },
	end_time: { type : Date, default : Date.now },
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
	created_at: { type : Date, default : Date.now },
	picture: { type : String, default : "https://semantic-ui.com/examples/assets/images/wireframe/image.png" }
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
			if (i != -1) { err = "Already joined!"; callback(err, null); }
			else{
				if (this.participation_method == 'public') {
					this.participants.push(user._id);
					this.save().then(callback(err, { "join": "Join success."}));
				}
				else if (this.participation_method == 'approval') {
					var j = this.wait_for_approval.indexOf(user._id);
					if (j != -1) { err = "Waiting for approval!"; callback(err, null); }
					else {
						this.wait_for_approval.push(user._id);
						this.save().then(callback(err, { "join": "Join waiting list (wait for approval)." }));
					}
				}
				else { err = "Can only join by invitation!"; callback(err, null); }
			}
		}
		// Quit activity: input needs to have attr.quit
		else if (attr.quit) {
			console.log("activity.Quit");
			var i = this.participants.indexOf(user._id);
			if (i != -1) {
				this.participants.splice(i, 1);
				this.save().then(callback(err, { "quit": "Quit success." }));
			}
			else{
				var j = this.wait_for_approval.indexOf(user._id);
				if (j != -1) {
					this.wait_for_approval.splice(j, 1);
					this.save().then(callback(err, { "quit": "Leave waiting list." }));
				}
				else { err = "Haven't joined!"; callback(err, null); }
			}
		}
		// Rate activity: input needs to have attr.rating
		else if (attr.rating) {
			console.log("activity.Rating");
			attr.rating = parseInt(attr.rating);
			if (this.rated_participants.indexOf(user._id) != -1) { err = "Have rated!"; callback(err, null); }
			else {
				if (this.rated_participants.length == 0) { this.rating = attr.rating; }
				else {
					this.rating = (this.rating * this.rated_participants.length + attr.rating) / (this.rated_participants.length + 1)
				}
				this.rated_participants.push(user._id);
				this.save().then(callback(err, { "rating": this.rating }));
			}
		}
		// OrganizerModify: input attr contains the items that has to be modified (directly_modified_keys + 'new_participants' + 'removed_participants')
		else {
			console.log("activity.DirectlyModify");
			const directly_modified_keys = ["title", "location_id", "location_name", "start_time", "end_time", "type ", "description",
								"expense", "status", "content_for_participants", "participation_method", "remind_time", "picture"];
			//attr = this.PurifyForm(attr); // ?????? what the fuck? why it can stuck here???
			console.log(attr);
			for (key in attr) {
				if (!attr[key]) continue;
				if (directly_modified_keys.indexOf(key) != -1) { this[key] = attr[key]; }
				else if (key == 'new_participants') {
					var list = attr.new_participants.split(',');
					for (var i = 0; i < list.length; i++) {
						var j = this.wait_for_approval.indexOf(list[i]);
						this.wait_for_approval.splice(j, 1);
						this.participants.push(list[i]);
					}
				}
				else if (key == 'removed_participants') {
					var list = attr.removed_participants.split(',');
					for (var i = 0; i < list.length; i++) {
						var j = this.participants.indexOf(list[i]);
						this.participants.splice(j, 1);
					}
				}
			}
			this.save().then(
				function(doc){
					callback(err, "OrganizerModify success.");
				},
				function(error){
					callback(error, null);
				});
		}
	},

	IsParticipant: function(user) {
		var i = this.participants.indexOf(user._id);
		if (i != -1) {
			return true;
		}
		else {
			return false;
		}
	},


	IsOrganizer: function(user) {
		if (this.organizer.equals(user._id))  {
			return true;
		}
		else {
			return false;
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
	}
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
			searchForm.start_time = {};
			if (form.time_search_from) {
				searchForm.start_time.$gte = new Date(form.time_search_from);
			}
			if (form.time_search_to) {
				searchForm.start_time.$lte = new Date(form.time_search_to);
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
		var activities = { 'joined': [], 'wait_for_approval': [], 'organized': [] };
		this.find({ $or: [{'participants': user._id}, {'wait_for_approval': user._id}, {'organizer': user._id}] },
			function(err, docs){
				if (err) {
					console.log("Find (GetByUser) activity Error!");
					callback(null);
				}
				else {
					for (var i = 0; i < docs.length; i++){
						var activity = docs[i];
						var j = activity.participants.indexOf(user._id);
						if (j != -1) {
							activities.joined.push(activity);
						}
						j = activity.wait_for_approval.indexOf(user._id);
						if (j != -1) {
							activities.wait_for_approval.push(activity);
						}
						if (activity.organizer.equals(user._id)) {
							activities.organized.push(activity);
						}
					}

					var cmp = function(a, b){
						if(b.start_time == null) return -1;
						else if(a.start_time == null) return 1;
						else {
							if(a.start_time <= Date.now() && b.start_time > Date.now()) {
								return 1;
							}
							else if(b.start_time <= Date.now() && a.start_time > Date.now()) {
								return -1;
							}
							else if(a.start_time <= Date.now() && b.start_time <= Date.now()) {
								return b.start_time.getTime() - a.start_time.getTime();
							}
							else if(b.start_time > Date.now() && a.start_time > Date.now()){
								return a.start_time.getTime() - b.start_time.getTime();
							}
						}
					};
					activities.joined.sort(cmp);
					activities.wait_for_approval.sort(cmp);
					activities.organized.sort(cmp);
					//console.log(activities.organized);

					var user_id_list = new Array();
					for (var i = 0; i < activities.joined.length; i++) {
						user_id_list.push(activities.joined[i].organizer);
					}
					mongoose.model('User').getInfoForGuest(user_id_list,
						function(res){
							for (var i = 0; i < activities.joined.length; i++) {
								activities.joined[i].organizer_info = res[activities.joined[i].organizer];
							}

							var user_id_list = new Array();
							for (var i = 0; i < activities.wait_for_approval.length; i++) {
								user_id_list.push(activities.wait_for_approval[i].organizer);
							}
							mongoose.model('User').getInfoForGuest(user_id_list,
								function(res){
									for (var i = 0; i < activities.wait_for_approval.length; i++) {
										activities.wait_for_approval[i].organizer_info = res[activities.wait_for_approval[i].organizer];
									}

									var user_id_list = new Array();
									for (var i = 0; i < activities.organized.length; i++) {
										user_id_list.push(activities.organized[i].organizer);
									}
									mongoose.model('User').getInfoForGuest(user_id_list,
										function(res){
											for (var i = 0; i < activities.organized.length; i++) {
												activities.organized[i].organizer_info = res[activities.organized[i].organizer];
											}
											callback(activities);
										});		
								});
						});
				}
			});
	},

	/**
	 * fake an new activity
	 *  @param {Object} info info should at least include the organizer
	 *  @return {Promise} [fulfill: created user document, reject: err]
	 */
	Fake: function(info){
		var Activity = this;
		function sample(myArray){
			return myArray[Math.floor(Math.random() * myArray.length)];
		}
		var start_time = new Date(faker.date.recent());
		var end_time = new Date(faker.date.recent());
		if (end_time < start_time) {var tmp; tmp = end_time; end_time = start_time; start_time = tmp;}
		new_info = {
			title: faker.lorem.words(),
			description: faker.lorem.paragraphs(),
			expense: faker.finance.amount(),
			status: sample(['future', 'going', 'finished', 'cancelled']),
			content_for_participants: faker.lorem.paragraphs(),
			participation_method: sample(['public', 'approval', 'only_invite']),
			start_time: start_time,
			end_time: end_time

		};
		Object.assign(new_info, info);
		console.log(new_info);
		return new Promise(function(fulfill, reject){
			if (!new_info.organizer) reject('organizer should be provided for fake');
			else {
				Activity.create(new_info)
				.then(
					function(activity) {fulfill(activity);},
					function(err) {reject(err);}
				);
			}
		});
	}
	// organizer: { type : Schema.Types.ObjectId, ref: 'User', required: 'Activity organizer cannot be empty.' }, // store the _id of the organizer
	// title: { type : String, required: 'Acitivity title cannot be blank', trim : true },
	// location_id: { type : String, trim : true }, // store the google API place_id of the location
	// location_name: { type : String, trim : true },
	// start_time: { type : Date, default : Date.now },
	// end_time: { type : Date, default : Date.now },
	// type: { type : String, default : null, trim : true },
	// description: { type : String, default : 'This Activity has no description', trim : true },
	// expense: { type : Number, default : 0, min : 0 },
	// status: { type : String, enum : ['future', 'going', 'finished', 'cancelled'], default : 'future' },
	// rating: { type : Number, min : 0, max : 5, default : null },
	// rated_participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	// content_for_participants: { type : String, default : null, trim : true },
	// participation_method: { type : String, enum : ['public', 'approval', 'only_invite'], default : 'public' },
	// remind_time: { type : Date, default : null },
	// participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	// wait_for_approval: [{ type : Schema.Types.ObjectId, ref: 'User' }],
	// created_at: { type : Date, default : Date.now }
};

mongoose.model('Activity', ActivitySchema);