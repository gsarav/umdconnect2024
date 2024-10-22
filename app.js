require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mainRoutes = './server/routes/main'; 
const userRoutes = './server/routes/user' ;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Business = require('./server/config/db.js');
const passport = require("passport");


const app = express();

const connectDB = require('/Users/gitikasaravanan/Desktop/UMDConnect-2024/server/config/db');
connectDB();

app.use(session ({secret: 'session secret', resave: false, saveUninitialized: false,}));

passport.serializeUser((business, done) => done(null, business.id)); 
passport.deserializeUser((business, done) => { 
    Business.findById(id, (err, business) => done(err, business)); 
}); 

app.use(express.static('/images'));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static('UMDConnect/node_modules/bootstrap/dist/css'));

app.use('/', require(mainRoutes));
app.use('/', require(userRoutes));

//Listening on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
