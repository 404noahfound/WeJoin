var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var AccountController = require('./controllers/AccountController');


module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

	app.get('/activity', ActivityController.Show);
	app.post('/activity',ActivityController.UponShow);

	//Activity Routes
	//Search activity 
	//return {activity title}
	app.get('/activity/search', ActivityController.Search);
	app.post('/activity/search', ActivityController.UponSearch);
	//Create activity
	app.get('/activity/create', ActivityController.Create);
	app.post('/activity/create', ActivityController.UponCreate);
	//OrganizerModify activity
	app.get('/activity/organizermodify', ActivityController.OrganizerModify);
	app.post('/activity/organizermodify', ActivityController.UponOrganizerModify);
	//Each activity
	app.get('/activity/:id', ActivityController.OrganizerModifyActivity);
	app.post('/activity/:id', ActivityController.UponOrganizerModifyActivity);
	//Delete activity
	app.get('/activity/delete', ActivityController.Delete);
	app.post('/activity/delete', ActivityController.UponDelete);
	//Each activity
	app.get('/activity/:id/delete', ActivityController.DeleteActivity);
	app.post('/activity/:id/delete', ActivityController.UponDeleteActivity);


	//show account
	app.get('/account', AccountController.Show);
	//guest
	app.get('/account/guest', AccountController.Guest);
	app.post('/account/guest', AccountController.UponGuest);
	//reguser
	app.get('/account/reguser', AccountController.Reguser);
	app.post('/account/reguser', AccountController.UponReguser);
	//Create account
	app.get('/account/signup', AccountController.Create);
	app.post('/account/signup', AccountController.UponCreate);
	//Sign in an account
	app.get('/account/signin', AccountController.Signin);
	app.post('/account/signin', AccountController.UponSignin);
	//Modify account
	app.get('/account/modify', AccountController.Modify);
	app.post('/account/modify', AccountController.UponModify);
	//Sign out
	app.get('/account/signout', AccountController.Signout);
	app.post('/account/signout', AccountController.UponSignout);
	//Each account
	app.get('/account/:id', AccountController.ModifyAccount);
	app.post('/account/:id', AccountController.UponModifyAccount);
	//follow
	app.get('/account/follow', AccountController.Follow);
	app.post('/account/follow', AccountController.UponFollow);
	//recommodation system
	app.get('/account/recommondation', AccountController.Recommondation);
	app.post('/account/recommondation', AccountController.UponRecommondation);


	//notification
	app.get('/notification', AccountController.Notification);
	app.post('/notification', AccountController.UponNotification);
	//create notification
	app.get('/notification/create', AccountController.NotificationCreate);
	app.post('/notification/create', AccountController.UponNotificationCreate);
	//delete notification
	app.get('/notification/delete', AccountController.NotificationDelete);
	app.post('/notification/delete', AccountController.UponNotificationDelete);

	//note
	app.get('/note', AccountController.Note);
	app.post('/note', AccountController.UponNote);
	//note create
	app.get('/note/create', AccountController.NoteCreate);
	app.post('/note/create', AccountController.UponNoteCreate);
	//note modify
	app.get('/note/modify', AccountController.NoteModify);
	app.post('/note/modify', AccountController.UponNoteModify);
	//note delete
	app.get('/note/delete', AccountController.NoteDelete);
	app.post('/note/delete', AccountController.UponNoteDelete);
};
