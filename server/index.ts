const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Joi = require('joi');
const auth = require('./auth');
const socket  = require('./socket');
const fishHome = require('./routes/fishHome');
const app = express();
 
app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
  })
)

mongoose.connect( "mongodb://localhost:27017/ruth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Connected to ruth in mondodb")).catch(err => console.error("Could not connect ruth database", err))

app.use(express.json()); //To process POST requests
app.use(express.static(path.resolve(__dirname, '../client/build')));

// add api to all routes
app.use('/api/fishHome', fishHome);

app.use(function (err, _req, res, _next) {
  res.status(500).send('Internal Server Error', err);
});
app.use(function (err, _req, res, _next) {
  res.status(500).send('Internal Server Error', err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server lisening on port:${PORT}`);
})



app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});