const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
	title: { type : String, default : '', trim : true },
	description: { type : String, default : 'This Activity has no description', trim : true},
	createdAt  : { type : Date, default : Date.now }
});

ActivitySchema.path('title').required(true, 'Acitivity title cannot be blank');

ActivitySchema.methods = {

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
};

mongoose.model('Activity', ActivitySchema);