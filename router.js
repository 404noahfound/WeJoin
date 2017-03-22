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
	app.get('/activity/:id', ActivityController.DeleteActivity);
	app.post('/activity/:id', ActivityController.UponDeleteActivity);









	//show account
	app.get('/account', AccountController.Show);
	//Create account
	app.get('/account/create', AccountController.Create);
	app.post('/account/create', AccountController.UponCreate);
	//Sign in an account
	app.get('/account/signin', AccountController.Signin);
	app.post('/account/signin', AccountController.UponSignin);
	//Modify account
	app.get('/account/modify', AccountController.Modify);
	app.post('/account/modify', AccountController.UponModify);
	//Each account
	app.get('/account/:id', AccountController.ModifyAccount);
	app.post('/account/:id', AccountController.UponModifyAccount);
	//note
	//app.get('/account/note', AccountController.Note);
	//app.post('/account/note', AccountController.UponNote);
};
