require("dotenv").config();

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it

//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths

const api = require("./api");
const auth = require("./auth");

// socket stuff
const socket = require("./server-socket");

// Server configuration below
// TODO change connection URL after setting up your team database
// TODO change database name to the name you chose

// connect to mongodb
const DB_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/ruth";
mongoose.connect( DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Connected to ruth in mondodb")).catch(err => console.error("Could not connect ruth database", err))


// create a new express server
const app = express();  
// app.use(express.cookieParser('your secret here'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



// allow us to process POST requests
app.use(express.json());

// set up a session, which will persist login data across requests
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.secret,
  cookie:{maxAge:3600000*24}
}))

// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "public");
app.use(express.static(reactPath));


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// });

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  // res.sendFile(path.join(reactPath, "index.html"));
  res.send("InValid Path");
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// hardcode port to 3000 for now
const port = process.env.PORT || 4000;
const server = http.Server(app);
socket.init(server);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
