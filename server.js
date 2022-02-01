require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes/mainRoute');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
require('./models/db');

const mainPage = require('./routes/mainRoute');
const adminPage = require('./routes/admin');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(mainPage);
app.use(adminPage);


app.use(mainRouter);

app.listen(5000, ()=>{
    console.log("Server run");
})