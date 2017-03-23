const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	username: { type : String, default : '', trim : true },
	password: { type : String, default : 'This Account has no description', trim : true},
	createdAt  : { type : Date, default : Date.now }
});

AccountSchema.path('username').required(true, 'Account username cannot be blank');

AccountSchema.methods = {

};

AccountSchema.statics = {

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
};

mongoose.model('Account', AccountSchema);
