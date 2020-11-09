const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greet');
const greetRoute = require('./routes')
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
//` which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';


const pool = new Pool({
  connectionString
  // ssl: useSSL
});
const greet = greetings(pool)
const greeted = greetRoute(greet)
const app = express()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'This is my warning message',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/addFlash', greeted.flashAdd)

app.get('/', greeted.show);

app.get('/delete', greeted.clear);

app.post('/greet', greeted.greeting);

app.get('/greeted', greeted.get);

app.get('/greeted/:userName', greeted.getCount);

app.get('/', greeted.flash);

const PORT = process.env.PORT || 3006;
app.listen(PORT, function () {
  console.log('App started at port:', PORT);
})