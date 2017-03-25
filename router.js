var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var AccountController = require('./controllers/AccountController');
var UserController = require('./controllers/UserController');
var NoteController = require('./controllers/NoteController');
var passport = require('passport');


module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

	//Activity Routes
	//Create
	app.get('/activity/create', ActivityController.Create);
	app.post('/activity/create', ActivityController.UponCreate);
	//Search
	app.get('/activity/search/:title', ActivityController.Search);
	//CustomerModify
	app.post('/activity/:id/customermodify', ActivityController.CustomerModify);
	//OrganizerModify
	app.get('/activity/:id/organizermodify', ActivityController.OrganizerModify);
	app.post('/activity/:id/organizermodify', ActivityController.UponOrganizerModify);
	//View
	app.get('/activity/:id', ActivityController.View);
		
	//show account
	// app.get('/account', AccountController.Show);
	// //guest
	// app.get('/account/guest', AccountController.Guest);
	// app.post('/account/guest', AccountController.UponGuest);
	// //reguser
	// app.get('/account/reguser', AccountController.Reguser);
	// app.post('/account/reguser', AccountController.UponReguser);
	// //Create account
	// app.get('/account/signup', AccountController.Create);
	// app.post('/account/signup', AccountController.UponCreate);
	// //Sign in an account
	// app.get('/account/signin', AccountController.Signin);
	// app.post('/account/signin', AccountController.UponSignin);
	// //Modify account
	// app.get('/account/modify', AccountController.Modify);
	// app.post('/account/modify', AccountController.UponModify);
	// //Sign out
	// app.get('/account/signout', AccountController.Signout);
	// app.post('/account/signout', AccountController.UponSignout);
	// //Each account
	// app.get('/account/:id', AccountController.ModifyAccount);
	// app.post('/account/:id', AccountController.UponModifyAccount);
	// //follow
	// app.get('/account/follow', AccountController.Follow);
	// app.post('/account/follow', AccountController.UponFollow);
	// //recommodation system
	// app.get('/account/recommondation', AccountController.Recommondation);
	// app.post('/account/recommondation', AccountController.UponRecommondation);


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
	app.get('/note', NoteController.Note);
	app.post('/note', NoteController.UponNote);
	//note create
	app.get('/note/create', NoteController.NoteCreate);
	app.post('/note/create', NoteController.UponNoteCreate);
	//note modify
	app.get('/note/modify', NoteController.NoteModify);
	app.get('/note/modify/:id', NoteController.NoteModifyEach);
	app.post('/note/modify/:id', NoteController.UponNoteModifyEach);
	//note delete
	app.get('/note/delete', NoteController.NoteDelete);
	app.get('/note/delete/:id', NoteController.NoteDeleteEach);
	app.post('/note/delete/:id', NoteController.UponNoteDeleteEach);
    // User Routes
    app.post('/user/login', 
        passport.authenticate('local', 
            { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }
        )
    );
    app.get('/user/login', UserController.LogIn);
    app.get('/user/logout', UserController.LogOut);
    app.get('/user/reg', UserController.Create);
    app.post('/user/reg', UserController.UponCreate);
    app.get('/user', UserController.Index);
    app.get('/user/modify', UserController.Modify);
    app.post('/user/modify', UserController.UponModify);
    app.get('/user/delete_all', UserController.DeleteAll);
    app.get('/user/:id', UserController.View);
};
