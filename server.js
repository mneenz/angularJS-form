const express = require('express'); //Require the express package
const app = express(); //Initializing express server
const port = process.env.PORT || 4000; //Port number for the server
var bodyParser = require ('body-parser');

//Helps us read JSON data. Don't put anything on top of this.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 
//Require the route.js file from the router folder. 
const route = require('./router/route.js');
//This is to fix Access-Control-Allow-Origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers",
        'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.use(express.static(__dirname + '/public')); // Make the application a public folder so that it can acces static paths
app.use('/api',route);
// refer to the index.html beacuse the application has become a simple javascript application
app.use('*', function (req, res) {
    res.sendfile(path.join(__dirname + '/public/index.html'));
});

//Calling the express server. Two parameters (error and data)
app.listen(port, function (err, data) { 
    if (err) //If there is error
    {
        console.log(err); //Show the error
    }
    console.log(`Server has started at port ${port}`); //Otherwise show that the server has started on the port 4000 
});