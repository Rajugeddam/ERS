// require all required module and variable

const express = require('express');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport_local_stratergy');
const Flash = require('connect-flash');
const customMware = require('./config/middleware');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded({extended: true}));

// use the static assets file here
app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);

// extarct the style and script from the sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use the session
app.use(session({
    name: 'Employee Review System',
    secret: 'test',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000* 60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://amit917480:hOtHsQP7mQfpralq@cluster0.rymrybp.mongodb.net/',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect mongodb_setup ok')
    }),
}))

// use the passport authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use the falsh function and custom mware

app.use(Flash());
app.use(customMware.setFlash);

// use the express router
app.use('/', require('./routes'));

// start our app on port
app.listen(port, function(err){
    if(err){
        console.log("didn't find the port", err);
    }
    console.log("port is find on: ", port)
})