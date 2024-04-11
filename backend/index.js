import express from 'express';
import mongoose from 'mongoose';
import { PORT, dbURL } from './config.js';
// import { Book } from './Models/BookModel.js';
import cors from 'cors';
// var cors = require('cors');
// var express = require('express') commented bcz module import is done  in  package.json type:module

//Server creation
var app = express();
app.use(express.json());
app.use(cors());
//server run in port

app.get('/', (req, res) => {
  res.send('hello how are  you iam from backend');
});

import router from './routes/booksRoute.js';
app.use('/books', router);
//How  to store BookData to DB

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB CONNECTED');
    app.listen(PORT, () => {
      console.log(`Server started in port `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
