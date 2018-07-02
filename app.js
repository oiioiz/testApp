var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.DEV_MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
    console.log("DB Connected!");
});

db.on("error", function(err){
    console.log("DB Error! : ", err);
});

var dataSchema = mongoose.Schema({
    name: String,
    count: Number
});

var Data = mongoose.model('data', dataSchema);
Data.findOne({name:"myData"}, function(err, data){
    if(err) return console.log("Data error : ", err);

    if(!data){
        Data.create({name:"myData", coount: 0}, function(err, data){
            if(err) return console.log("Data error : ", err);
            console.log("Counter initialized : ", data);
        });
    }
});

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
    res.render('first');
});

app.listen(3000, function(){
    console.log('Server On!');
});
