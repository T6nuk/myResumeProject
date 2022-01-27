const express = require('express');
const mainRouter = require('./routes/mainRoute');
const ejs = require('ejs');
require('./models/db');

const mainPage = require('./routes/mainRoute');
const adminPage = require('./routes/admin');

const app = express();
app.set('view engine', ejs);
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));

app.use(mainPage);
app.use(adminPage);


app.use(mainRouter);

app.listen(5000, ()=>{
    console.log("Server run");
})