var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');


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
    //OrganzerModifyActivity
  //  app.get('/activity/organizermodifyactivity', ActivityController.OrganzerModifyActivity);
 //   app.post('/activity/organizermodifyactivity', ActivityController.UponOrganizerModifyActivity);
//
    app.get('/activity/:id', ActivityController.OrganizerModifyActivity);
    app.post('/activity/:id', ActivityController.UponOrganizerModifyActivity);
};
