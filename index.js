const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greet');
 const flash = require('express-flash');
 const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;
 

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_products';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });
const greet = greetings() 
const app = express()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs({layoutsDir: './views/layouts'}));
app.set('view engine', 'handlebars');

 app.use(session({
     secret: 'This is my warning message',
     resave: false,
     saveUninitialized: true
   }));

  // initialise the flash middleware
   app.use(flash());

app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  });

	app.get('/', function (req, res) {

     res.render('index', {
    count: greet.counter()
 });
 });
 

	app.post('/greet', function(req, res){
	 // req.flash('info', 'please enter name');
  //    res.redirect('/');
  let name = (req.body.greeted_name).toLowerCase();
  let language = req.body.languageType;
if (name === ''){
  req.flash('info', 'please enter name'),
  await pool.query('insert into greetings (greeted_name, greeted_counter) value($1, $2)' , [name ,language 1]);
}
else if(language === undefined && name != ''){
   req.flash('info', 'please select a language'),
   await pool.query('insert into greetings (greeted_name, greeted_counter) value($1, $2)' , [name ,language, 1]);

}
else{
  greet.storeName(name, language),
  await pool.query('insert into greetings (greeted_name, greeted_counter) value($1, $2)' , [name ,language 1]);

	}	

	// var error = greet.errorMessages(name, language);
 res.render('index',{
 	message : greet.greeted(req.body.languageType , req.body.nameValue),
  // message : (error === '') ? greet.greeted(req.body.languageType, req.body.nameValue): error,
   count : greet.counter(),
   
 })	
 });

//#counter
 app.get('/greeted',function(req, res){
var greetedNames = greet.getNames();
for(const list in greetedNames){

}
 	res.render('greeted',{
 	names : greetedNames

 	})
 	
 	})


app.get('/greeted/:userName', function(req, res){
	const userName = req.params.userName;
	var count = greet.getNameCounter(userName);
	
	
	//it redirect the default route
	res.render("greeted", {
        name : `Hello, ${userName} have been greeted ${count} times`
    });
	
	
});


  

   
 app.get('/', function (req, res) {
     req.flash('info', 'please enter name');
     res.redirect('/');
   });
 // app.get('/', function(req, res){
 //   // Get an array of flash messages by passing the key to req.flash()
 //   res.render('index', { messages: req.flash('info') });
 // });
  




const PORT = process.env.PORT || 3015;
app.listen(PORT, function(){
	console.log('App started at port:', PORT);
})