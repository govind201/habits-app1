const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const Joi = require('joi');
const PORT = process.env.PORT || 3001;
const app = express();

mongoose.connect('mongodb://loalhost:27017/ruth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Connected to ruth in mondodb")).catch(err => console.error("Could not connect ruth database", err))

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, ()=> {
    console.log(`Server lisening on port:${PORT}`);
})

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});