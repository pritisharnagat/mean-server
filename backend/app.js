
var express         = require('express');
var app 			= express();
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var path            = require('path');
var fs 				= require('fs');
var morgan          = require('morgan');
var Errors          = require('node-common-errors');
var config 			= JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));
var strategiesDir 	= fs.readdirSync(path.join(__dirname, './library/strategiesPassport'));
var modelsDir		= fs.readdirSync(path.join(__dirname, './models'));
var routesDir		= fs.readdirSync(path.join(__dirname, './router/routes'));
var authDir 		= fs.readdirSync(path.join(__dirname, './router/auth'));


app.use(bodyParser.json());                                                         //Enable parser middleware
app.use(bodyParser.urlencoded({  extended : true }));
app.use(function(req,res,next){//Header Configuration
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Contrl-Allow-Methods' , 'GET','PUT','POST','DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.set('env', app.get('env') || 'production');                 //Check environment configuration


require('./library/database')(app.get('env'));                  //MongoDB connection.

modelsDir.forEach(function (file) { 
	if (file.indexOf('.js') >-1) {                                   //Inject all javascript files contained in 'models' directory.
		require('./models/' + file);
	}
});

strategiesDir.forEach(function (file) {
	if (file.indexOf('.js') >-1) {
       var local = require('./library/strategiesPassport/'+file)(app.get('env'), passport);  //Configure strategies for Passport.
}});
	



app.use(morgan('dev'));
app.use(cookieParser(config[app.get('env')].cookieSecret, { httpOnly: true }));     // Enable cookie middleware



/*app.use(session({ 
	name: 'sessionID', 
	secret: config[app.get('env')].sessionSecret, 
	cookie: {
		path: '/',
		httpOnly: true,                                                          
		secure: true,
		maxAge: 1*60*60*1000
       
	},
   
	rolling: true, 
	resave: false, 
	saveUninitialized: true 
}));*/

app.use(session({secret: config[app.get('env')].sessionSecret,
    cookie: {
        path: '/',
		secure: false,                                                        //Enable session middleware
        httpOnly: true, 
        maxAge: 1*60*60*1000
       
	},
    resave: false, 
	saveUninitialized: true }));
app.use(passport.initialize());                                                  // Enable authentication strategies


app.use(passport.session()); 
//Enable persistent login 

app.use(flash());
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');                             //Enable flash middleware
    res.locals.error =req.flash('error');
    next();
})
/*app.use (function(req, res, next){
  res.header ('Access-Control-Allow-Origin', 'http://localhost:900');
  res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
  res.header ('Access-Control-Allow-Credentials', true);
  res.header ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});*/
authDir.forEach(function (filename) {
		if (filename.indexOf('.js') > -1) {                                            //enable your passport route folder
			var authname = filename.substr(0, filename.length-3);
			require('./router/auth/' + authname)(passport);
             app.use('/', require('./router/auth/' + authname)(passport));
		}
	});


routesDir.forEach(function (filename) {
		if (filename.indexOf('.js') >-1) {
           var routename = filename.substr(0, filename.length-3);
           require('./router/routes/' + routename)                                  //enable your route folder
            app.use('/', require('./router/routes/' + routename));
  
        };
	});

app.use(Errors.commonErrorHandler);
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(401).send('Invalid');
    next();
})
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: "Internal Error",
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: "Internal Error",
    error: {}
  });
});


module.exports = app;                                                  //Export the configured Express app
