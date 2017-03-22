var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var AccountController = require('./controllers/AccountController');


module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

    //Activity Routes
    //Search
    app.get('/activity/search/:keyword', ActivityController.Search);
    //View
    app.get('/activity/:id', ActivityController.View);
    //Create
    app.get('/activity/create', ActivityController.Create);
    app.post('/activity/create', ActivityController.UponCreate);
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
