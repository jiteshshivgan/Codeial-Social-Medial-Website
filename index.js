const express=require('express');
//const because we do not want this variable to be over-ridden by anyone in the code

const path=require('path');
const port =8000;
const app=express();
//When we deploy to live server, it would be port number 80.
const expressLayouts = require('express-ejs-layouts');
// All the views which are going to be rendered using routes belong to same layouts. 
const db=require('./config/mongoose');
//while requiring our mongoose file this will go and run mongoose.js file.

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//This require a argument session. Because we need to store the session data inside it.
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

//We need our file to be precompiled before the server starts 
app.use(sassMiddleware({
    //source: from where do we need to pick up scss file to convert it into css.
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    //If we want them in multiple lines
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.static('./assets'));

// Tell the app where to look out for assets file.

app.use(expressLayouts);
//use express router

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





app.use(express.urlencoded());
// app.user('/') yeh path bta rha jo user search karega.


//set ejs as our new engine
app.set('view engine', 'ejs');
app.set('views', './views');


//Name of my cookie codial 
//mongo store is used to store the session cookie in the db.
app.use(session({
    name: 'codial',
    //TODO change the secret before deployment in production mode.
    secret: 'blah something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    //In case the server restart now the signed user info will not get lost.
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codial_development'
            // autoremove: 'disabled'
        }, function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    ) 
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log('Error in running the server: ', err);
        //interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});

//I need to make it GIT repository so that we can track all the changes.