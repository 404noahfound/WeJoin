const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = require("mongoose-relationship");

const UserSchema = new Schema({
	password: { type : String, trim : true},
	username: { type : String, trim : true, unique: true/*the unique constraint is not working*/ },
	nickname: { type : String, trim : true},
	gender: { type : String, enum : {values : ['Male', 'Female'], message : 'gender must be male or female'}},
	birthday: { type : Date},
	city: {type : String},
	description: {type : String},
	marked_activities: [{type : Schema.Types.ObjectId, ref: 'Activity'}],
	follow_to: [{type : Schema.Types.ObjectId, ref: 'User'}],
	follow_by: [{type : Schema.Types.ObjectId, ref: 'User', childPath: 'follow_to'}],
	// marked_notes: [{type : Schema.Types.ObjectId, ref: 'Note'}],
	created_at  : { type : Date, default : Date.now }
});

UserSchema.path('password').required(true, 'User name cannot be blank');
UserSchema.path('username').required(true, 'User password cannot be blank');
UserSchema.path('gender').required(true, 'Gender cannot be blank');
UserSchema.plugin(relationship, { relationshipPathName:'follow_by' });

UserSchema.methods = {
	/**
	 * check if the password matches the password in the database
	 * @param  {String}
	 * @return {Boolean}
	 * @author Su
	 */		
	validPassword: function(password) {
		return this.password === password;
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
	}
};

mongoose.model('User', UserSchema);