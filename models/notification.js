const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = mongoose.model('User');

const Notification = new Schema({
	sender: { type : Schema.Types.ObjectId, ref: 'User', required: 'Notification sender cannot be empty.', trim : true }, //store the _id of the sender
	receiver: { type : Schema.Types.ObjectId, ref: 'User', required: 'Notification receiver cannot be empty.', trim : true }, //store the _id of the receiver
	description: { type : String, default : 'This Notification has no description', trim : true }, 
	status: {type : Boolean, trim : true }, //if status is true, it is unread. Otherwise, it is read
    created_at: {type: Date, default: Date.now}
});
	

Notification.methods={


/*
 * Delete function:
 *
 * @class      Delete (notification)
 * @author     Tim
 */
	Delete: function(){
		/**
		 * delete this notification
		 */
		console.log("notification delete");
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
 * @author     Tim
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
 * @param      {Tim}  User    The user
 * @return     {[docs]}  an array of user's notifications
 */
	GetByUser: function(user, callback){
        console.log("Notification.GetByUser");
        var response = {'sent': [], 'received': []};
        this.find({$or: [{'sent': user._id}, {'received': user._id}]},
        	function(err,docs){
        		if(err){
        			console.log("Find (GetByUser) notification error!");
        		}
        		else{
        			for(var i=0;i<docs.length;i++){
        				var notification = docs[i];
        				var j = notification.sender.indexOf(user._id);
        				if(j!=-1){
        					response.sent.push(notification);
        				}
        				j=notification.receiver.indexOf(user._id);
        				if(j!=-1){
        					response.received.push(notification);
        				}
        			}
        		}
        		console.log(docs);
        		console.lot(user._id);
        		callback(response);
        	})
	}

	
}

mongoose.model('Notification', Notification);