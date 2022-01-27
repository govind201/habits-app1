//import { createConnection } from 'typeorm';
const {createConnection} = require('typeorm');
// import express from 'express';
const express = require('express');
// import api from '';
const api = require('./api/api.js')
// import enforce from "express-sslify";
const enforce = require('express-sslify');


// import api from './api/api';

const app = express();
const  main = async() => {
      await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'ruth',
            password: 'ruth',
            database:  'ruth',
            entities: [__dirname + '/entity/*.ts']
      })
      .then((connection) => {
             app.listen(8080, ()=> console.log("Running on port 8080"));
                 console.log('Database connected')
                return connection;
      })
      .catch(err => console.log(err));
}
app.user("/api", api)
app.use(enforce.HTTPS());  
main();
