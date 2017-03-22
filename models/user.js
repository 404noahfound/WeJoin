const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	password: { type : String, trim : true },
	username: { type : String, trim : true },
	createdAt  : { type : Date, default : Date.now }
});

UserSchema.path('password').required(true, 'User password cannot be blank');

UserSchema.methods = {
	validPassword: function(password) {
		return this.password === password;
	}
};

UserSchema.statics = {

	/**
	 * test function description
	 * @return {String}
	 */
	test: function() {
		return 'this is a test string.'
	}
};

mongoose.model('User', UserSchema);