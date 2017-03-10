const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
	title: { type : String, default : '', trim : true }
});

ActivitySchema.methods = {

};

ActivitySchema.statics = {

	/**
	 * test function description
	 * @return {String}
	 */
	test: function() {
		return 'this is a test string.'
	}
};

mongoose.model('Activity', ActivitySchema);