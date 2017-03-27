const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const Notification = new Schema({
	sender: { type : String, required: 'Notification sender cannot be empty.', trim : true }, //store the _id of the sender
	receiver: { type : String, required: 'Notification receiver cannot be empty.', trim : true }, //store the _id of the receiver
	description: { type : String, default : 'This Notification has no description', trim : true }, 
	status: {type : Boolean, trim : true } //if status is true, it is unread. Otherwise, it is read
});
	

Notification.methods={

	/**
	 * Create function:
	 * 
	 *
	 * @param      {String}  sender_id    The sender identifier
	 * @param      {String}  receiver_id  The receiver identifier
	 * @param      {String}  description  The description
	 * author     Tim <404342707@qq.com>
	 * Create a new notification
	 */
	Create: function(sender_id,receiver_id,description) {
		console.log("notification.create");
		this.sender=sender_id;
		this.receiver=receiver_id;
		this.description=description;
		this.save(function(err){
			if(err) console.log(err);
		});
	},

/**
 * Delete function:
 *
 * @class      Delete (notification)
 * author     Tim
 */
	Delete: function(){
		/**
		 * delete this notification
		 */
		return  "this is a Delete function";
	},

	ViewSingle: function(){
		this.status=false;

	},
	
/**
 * MarkAsUnread function:
 * 
 * mark the notification as unread
 * Only can be used for receiver
 *author     Tim
 */
	MarkAsUnread: function(){
		this.status=true;
	}
};

Notification.statics={
	
	/**
	 * Test
	 *
	 * @class      Test (name)
	 * @return     {String}  { description_of_the_return_value }
	 * author      Tim
	 */
	Test: function(){
		return "This is a test function.";
	},

/**
 * Gets the notifications of the user.
 * 
 * @class      GetByUser (name)
 * @param      {JSOn}  User    The user
 * @return     {[docs]}  an array of user's notifications
 */
	GetByUser: function(User){
		return "Notification.GetByUser.";
	}

	
};

mongoose.model('Notification', Notification);