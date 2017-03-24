'use strict';
// Call the packages we need
var fs  = require('fs');
var app = require('./backend/app');
var path = require('path');
var logger= require('morgan');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, './config.json'), 'utf8'));

if (app.get('env') === 'development') {

  // Use morgan middleware as logger
    app.use(logger('dev'));

	// Set hostname from config file to a variable
	var host = config.development.host;

	// Set port from config file to a variable
	var port = config.development.port;
    
   
}

else {

	// Set hostname from config file yo variable
	var host = config.production.host;

	// Set port from config file to a variable
	var port = config.production.port;
}
//gonna listen to hostname:port...
app.listen(port);
console.log('Server is running at http://localhost:' + port + 'at' + app.get('env') );
