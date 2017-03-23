var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var NoteController = require('./controllers/NoteController');

module.exports = function(app){
	// Main Routes
	app.get('/', HomeController.Index);
	app.get('/other', HomeController.Other);

	//Activity Routes
	//Create
	app.get('/activity/create', ActivityController.Create);
	app.post('/activity/create', ActivityController.UponCreate);
	//OrganizerModify
	app.get('/activity/organizermodify', ActivityController.OrganizerModify);
	app.post('/activity/organizermodify', ActivityController.UponOrganizerModify);
	//Note Routes
	//Create
	app.get('/note/create', NoteController.Create);
	app.post('/note/create', NoteController.UponCreate);
	//Modify
	app.get('/note/modify', NoteController.Modify);
	app.post('/note/modify', NoteController.UponModify);
};
