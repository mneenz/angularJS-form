const express=require('express');
const router=express.Router();
const mongo=require('mongojs');
const db = mongo('mongodb://neendreams:1234567@ds217138.mlab.com:17138/angular-course-db', ['angular-course-db']); //Name and array
//Get API. The function is requesting our data and responding from our server. 
//Changing the URL to /GetList. This is the only one that can be read in the browser.
router.get('/GetList', function (req, res) {
    var Userdata=db.user.find(function(err,data) //Getting the data from the db.user.find
    {
        if (err)// If there is an error
        {
            res.send(err); //Show error
        }
        res.json(data); //Otherwise show the data (the tables info in the database)
    }
);
    //res.send('get api called'); //Send the response from the server
});

//Get list by ID
router.get('/GetListById/:id', function (req, res) {
    var Userdata = db.user.find({_id:mongo.ObjectId(req.params.id)}, function (err, data) //Getting the data from the db.user.find
    {
        if (err)// If there is an error
        {
            res.send(err); //Show error
        }
        res.json(data); //Otherwise show the data (the tables info that has been added to the aparticular ID in the in the database)
    }
    );
    //res.send('get api called'); //Send the response from the server
});

//Get API. The function is requesting our data and responding from our server. 
//Changing the URL to /AddList. App.post means to create
router.post('/AddList', function (req, res) {
    db.user.insert(req.body,function (err,data){
        if (err)// If there is an error
        {
            res.send(err); //Show error
        }
        res.json({"msg":"Data has been added"}); //Otherwise show the data (the tables that have been added)   
    //res.json(JSON.stringify(req.body)); // Getting JSON and converting JSON Object to normal  object. Req.body will show us our parameter 
    });
});

//Get API. The function is requesting our data and responding from our server
router.put('/UpdateList/:id', function (req, res) {
    db.user.update({ _id: mongo.ObjectId(req.params.id)}, req.body,{}, function (err, data) { //This is the syntax to update the list
        if (err)// If there is an error
        {
            res.send(err); //Show error
        }
        res.json({ "msg": "Record has been updated" }); //Otherwise show the data (the table thas has been deleted from the database)   
        //res.json(JSON.stringify(req.body)); // Getting JSON and converting JSON Object to normal  object. Req.body will show us our parameter 
    });
});

//Delete records from list
router.delete('/DeleteList/:id', function (req, res) { 
    db.user.remove({ _id: mongo.ObjectId(req.params.id) }, function (err, data) { //This is the syntax to remove things from the list
        if (err)// If there is an error
        {
            res.send(err); //Show error
        }
        res.json({ "mgs": "Record has been removed" }); //Otherwise show the data (the tables info in the database)   
        //res.json(JSON.stringify(req.body)); // Getting JSON and converting JSON Object to normal  object. Req.body will show us our parameter 
    });
});

module.exports=router;