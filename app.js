var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


mongoose.connect(process.env.DEV_MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
    console.log("DB Connected!");
});

db.on("error", function(err){
    console.log("DB Error! : ", err);
});


app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:'MySecret'}));

var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(3000, function(){
    console.log('Server On!');
});