var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');


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

};
