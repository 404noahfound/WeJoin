var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var AccountController = require('./controllers/AccountController');
var NoteController = require('./controllers/NoteController');
var NotificationController = require('./controllers/NotificationController');


module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

	app.get('/activity', ActivityController.Show);

	app.get('/activity/search/:keyword', ActivityController.Search);
	app.post('/activity/search/:keyword', ActivityController.UponSearch);
	//Create activity
	app.get('/activity/new', ActivityController.Create);
	app.post('/activity/new', ActivityController.UponCreate);
	//OrganizerModify activity
	app.get('/activity/:id/join', ActivityController.JoinActivity);
	app.post('/activity/:id/join', ActivityController.UponJoinActivity);
	//Join activity
	app.get('/activity/:id/update', ActivityController.OrganizerModify);
	app.post('/activity/:id/update', ActivityController.UponOrganizerModify);
	//Rate activity
	app.get('/activity/:id/rate', ActivityController.RateActivity);
	app.post('/activity/:id/rate', ActivityController.UponRateActivity);
	//Each activity
	app.get('/activity/:id', ActivityController.ShowActivityFile);
	app.post('/activity/:id', ActivityController.UponShowActivityFile);
	//Delete activity
	app.get('/activity/:id/delete', ActivityController.Delete);
	app.post('/activity/:id/delete', ActivityController.UponDelete);


	//reguser
	app.get('/user/reg', AccountController.Reguser);
	app.post('/user/reg', AccountController.UponReguser);
	//Create account
	app.get('/user/sign_up', AccountController.Create);
	app.post('/user/sign_up', AccountController.UponCreate);
	//Sign in an account
	app.get('/user/sign_in', AccountController.Signin);
	app.post('/user/sign_in', AccountController.UponSignin);
	//Modify account
	app.get('/user/manage', AccountController.Modify);
	app.post('/user/manage', AccountController.UponModify);
	///Sign out
	app.get('/user/sign_out', AccountController.Signout);
	app.post('/user/sign_out', AccountController.UponSignout);
	//Each account
	app.get('/user/:id', AccountController.ShowUserFile);
	app.post('/user/:id', AccountController.UponShowUserFile);
	//follow
	app.get('/user/:id/follow', AccountController.Follow);
	app.post('/user/:id/follow', AccountController.UponFollow);



	//create notification
	app.get('/notification/:id/response', NotificationController.NotificationResponse);
	app.post('/notification/:id/response', NotificationController.UponNotificationResponse);

	//note create
	app.get('/note/new', NoteController.NoteCreate);
	app.post('/note/new', NoteController.UponNoteCreate);
};