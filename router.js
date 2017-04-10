var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var AccountController = require('./controllers/AccountController');
var UserController = require('./controllers/UserController');
var NoteController = require('./controllers/NoteController');
var passport = require('passport');
var multer = require('multer');

var uploading = multer({
  dest: 'static/public/uploads/',
});


module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

	//Activity Routes
	//GetByUser for test
	app.get('/activity/getbyuser', ActivityController.GetByUser);
	//DeleteAll
	app.get('/activity/delete_all', ActivityController.DeleteAll);
	//Create
	app.get('/activity/create', ActivityController.Create);
	app.post('/activity/create', ActivityController.UponCreate);
	//Search
	app.post('/activity/search', ActivityController.Search);
	//View
	app.get('/activity/:id', ActivityController.View);
	//CustomerModify
	app.post('/activity/:id/customermodify', ActivityController.CustomerModify);
	//OrganizerModify
	app.get('/activity/:id/organizermodify', ActivityController.OrganizerModify);
	app.post('/activity/:id/organizermodify', ActivityController.UponOrganizerModify);

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
	app.get('/note/user/:id', NoteController.NoteUser);
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
	//note search
	app.get('/note/search', NoteController.NoteSearch);
	app.post('/note/search', NoteController.UponNoteSearch);
	app.get('/note/view/:id', NoteController.NoteViewEach);
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
    app.post('/user/modify', uploading.single('avatar'), UserController.UponModify);
    app.get('/user/delete_all', UserController.DeleteAll);
    app.post('/user/follow_actions', UserController.FollowActions);
    app.post('/user/get_users_api', UserController.GetUsersAPI);
    app.get('/user/:id', UserController.View);
};
