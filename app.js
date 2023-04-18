var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');


var app = express();

const route = require('./routes/route');

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactList');

//On connection
mongoose.connection.on('connected', function(){
    console.log('DBconnected successfully.');
});

//on connection error
mongoose.connection.on('error', function(error){
    if(error){
        console.log('DB Error is : ' + error);
    }
});

// Define port
const port = 3000;

// Adding middleware - cors
app.use(cors());

// Body Parser
app.use(bodyParser.json());

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', route);

// Testing Route
app.get('/', function(req, res){
    console.log('Response -- ', res);
   res.send('Hello'); 
});

app.listen(port, ()=>{
    console.log('Server is running at port:'+port);
})