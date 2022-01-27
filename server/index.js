const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const fishHome = require('./routes/fishHome');
const api = require('./api/api.js')
const app = express();
 

app.use(session({
  resave:true,
  saveUninitialized:true,
  secret: "secret",
  cookie:{maxAge:3600000*24}
}))

mongoose.connect( "mongodb://localhost:27017/ruth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Connected to ruth in mondodb")).catch(err => console.error("Could not connect ruth database", err))

app.use(express.json()); //To process POST requests
app.use(express.static(path.resolve(__dirname, '../client/build')));

// add api to all routes


const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server lisening on port:${PORT}`);
})

app.use("/api", api)

app.get('*', (_, res) => {
    res.send("Invalid path");
});