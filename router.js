var HomeController = require('./controllers/HomeController');
var ActivityController = require('./controllers/ActivityController');
var UserController = require('./controllers/UserController');
var passport = require('passport');


module.exports = function(app){
    // Main Routes
	app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);

    //  Activity Routes
    //  Create
    app.get('/activity/create', ActivityController.Create);
    app.post('/activity/create', ActivityController.UponCreate);
    //  OrganizerModify
    app.get('/activity/organizermodify', ActivityController.OrganizerModify);
    app.post('/activity/organizermodify', ActivityController.UponOrganizerModify);

    // User Routes
    app.post('/user/login', 
        passport.authenticate('local', 
            { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }
        )
    );
    app.get('/user/login', UserController.LogIn);
    app.get('/user/reg', UserController.Create);
    app.post('/user/reg', UserController.UponCreate);
    app.get('/user', UserController.Index);
};
