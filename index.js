const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greet');
const greet = greetings() 
const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs({layoutsDir: './views/layouts'}));
app.set('view engine', 'handlebars');


	app.get('/', function (req, res) {
     res.render('index', {
    count: greet.counter()
 });
 });

	app.post('/greet', function(req, res){
	greet.storeName(req.body.nameValue, req.body.languageType)
	var error = greet.errorMessages(req.body.languageType, req.body.nameValue)
		
 res.render('index',{
 	message : greet.greeted(req.body.languageType , req.body.nameValue),
  message : (error === '') ? greet.greeted(req.body.languageType, req.body.nameValue): error,
   count : greet.counter(),
   
 })	
 });

//#counter
 app.get('/greeted',function(req, res){

 	res.render('greeted',{
 	names : greet.getNames(),

 	})
 	
 	})

app.get('/greeted/:userName', function(req, res){
	const userName = req.params.userName;
	var count = greet.getNameCounter(userName);
	
	
	//it redirect the default route
	res.render("greeted", {
        names : count
    });
	
	
});



const PORT = process.env.PORT || 3015;
app.listen(PORT, function(){
	console.log('App started at port:', PORT);
})