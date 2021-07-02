const express = require('express');
const session = require('express-session');
const path = require('path');

//Working with environment variables
const dotenv = require('dotenv');
dotenv.config();

//include db related 
const mongoose = require('mongoose');
const Joi = require('joi');

//import app, api, and socket 
const api = require('./api/api');
const auth = require('./auth');
const socket  = require('./socket');

 
const app = express();

app.use(express.json()); //To process POST requests
app.use(
  Session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
  })
)
const PORT = process.env.PORT || 3001;

mongoose.connect( "mongodb://localhost:27017/ruth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Connected to ruth in mondodb")).catch(err => console.error("Could not connect ruth database", err))

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, ()=> {
    console.log(`Server lisening on port:${PORT}`);
})

console.log(process.env.DB_STR);

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});