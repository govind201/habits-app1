import { createConnection } from 'typeorm';
import express from 'express';
import api from './api/api';
import enforce from "express-sslify";


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
      .then(() => {
             app.listen(8080, ()=> console.log("Running on port 8080"));
             return  console.log('Database connected')
      })
      .catch(err => console.log(err));
}
app.user("/api", api)
app.use(enforce.HTTPS());  
main();