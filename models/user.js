const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");
const Activity = mongoose.model('Activity');
const Note = mongoose.model('Note');
const only = require('only');
const faker = require('faker');


const UserSchema = new Schema({
	password: { type : String},
	username: { type : String, unique: true, index: true/*the unique constraint is not working*/ },
	nickname: { type : String, trim : true},
	gender: { type : String, enum : {values : ['Male', 'Female'], message : 'gender must be male or female'}},
	birthday: { type : Date},
	city: {type : String},
	description: {type : String},
	marked_activities: [{type : Schema.Types.ObjectId, ref: 'Activity'}],
	follow_to: [{type : Schema.Types.ObjectId, ref: 'User'}],
	marked_notes: [{type : Schema.Types.ObjectId, ref: 'Note'}],
	own_notes:[{type : Schema.Types.ObjectId, ref: 'Note'}],
	created_at  : { type : Date, default : Date.now },
	avatar : {type : String, default : "https://semantic-ui.com/examples/assets/images/wireframe/image.png" },
	email : {type : String}
});

UserSchema.path('password').required(true, 'User name cannot be blank');
UserSchema.path('username').required(true, 'User password cannot be blank');
UserSchema.path('email').required(true, 'Email cannot be blank');
UserSchema.index({nickname: 'text', username: 'text', description: 'text', city: 'text'});


UserSchema.methods = {
	/**
	 * check if the password matches the password in the database
	 * @param  {String}
	 * @return {Boolean}
	 * @author Su
	 */		
	validPassword: function(password) {
		return this.password === password;
	},
	getAvatarUrl: function(){
		if(this.avatar) return this.avatar.replace('static','');
		return null;
	},
	getFollowsInfo: function(callback){
		// console.log('arrive here');
		this.model('User').find({_id: {$in: this.follow_to}}, callback);
	},
	getInfoForView: function(callback){
		var info = {user: this};
		var this_user = this;
		info.user.avatar = this_user.getAvatarUrl();
		Activity.GetByUser(this_user, function(activities){
			info.activities = activities;
			this_user.getFollowsInfo(function(err, follows){
				// console.log('also arrive here');
				// console.log(follows);
				for(var i = 0; i < follows.length; i++){
					follows[i].avatar = follows[i].getAvatarUrl();
					follows[i] = only(follows[i], "_id avatar nickname username");
				}
				info.follows = follows;
				Note.GetByUser(this_user)
				.then(
					function(notes){
						info.notes = notes;
						callback(info);
					}
				);
			});
		});
	},
	follow: function(followee, callback){
		var i = this.follow_to.indexOf(followee._id);
		var err = null;
		if (i == -1){
			this.follow_to.push(followee);
		}
		this.save().then(callback(err, { "follow": "Follow success."}));
	},
	unfollow: function(followee, callback){
		var i = this.follow_to.indexOf(followee._id);
		var err = null;
		if (i != -1){
			this.follow_to.splice(followee);
		}
		this.save().then(callback(err, { "unfollow": "Unfollow success."}));
	},
	hasFollow: function(followee){
		var i = this.follow_to.indexOf(followee._id);
		if(i == -1) return 0;
		return 1;
	},	

	fakeActivity: function(){
		var info = {organizer: this._id};
		console.log('arrive here');
		return new Promise(function(fulfill, reject){
			Activity.Fake(info).then(
				function(activity) {
					console.log('success fake');
					fulfill(activity);
				},
				function(err) {
					console.log(err);
					reject(err);
				}
			);

		});
	}
};

UserSchema.statics = {

	/**
	 * test function description
	 * @return {String}
	 * @author Su
	 */
	test: function() {
		return 'this is a test string.'
	},

	/**
	 * @description filter out all empty field
	 * @param  {Object}
	 * @return {Object}
	 */
	purifyForm: function(form) {
		var purifiedForm = {};
		for (field in form){
			if (form[field].length > 0) {
				purifiedForm[field] = form[field];
			}
		}
		return purifiedForm;
	},

	fake: function(num){
		function sample(myArray){
			return myArray[Math.floor(Math.random() * myArray.length)];
		}
		var user_info = [];
		for(var i = 0; i < num; i++){
			user_info.push({
				password: '123456',
				username: faker.internet.userName(),
				nickname: faker.name.findName(),
				gender: sample(['Male', 'Female']),
				// birthday: faker.date.past(),
				city: faker.address.city(),
				description: faker.lorem.sentences(),
				avatar: faker.image.avatar(),
				email: faker.internet.email()
			});
		}
		this.create(user_info, function(err, users){
			if(err) console.log(err);
		});
		return user_info;
	},

	getInfoForGuest: function(user_id_list, callback) {
		this.find({_id: { $in: user_id_list} },
			function(err, docs){
				if (err) {

				}
				else {
					res = {};
					for (var i = 0; i < docs.length; i++) {
						res[docs[i]._id] = only(docs[i], "_id username nickname avatar")
					}
					callback(res);
				}
			});
	},

	Search: function(keyword) {
		return this
		    .find(
		        { $text : { $search : keyword } }, 
		        { score : { $meta: "textScore" } }
		    )
		    .sort({ score : { $meta : 'textScore' } })
		    .limit(100)
		    .exec()
		    .then(
		    	function(users){
		    		return users;
		    	}
		    );
	}
};

mongoose.model('User', UserSchema);