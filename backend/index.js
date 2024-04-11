import express from 'express';
import { PORT, dbURL } from './config.js';
import mongoose from 'mongoose';
// import { Book } from './Models/BookModel.js';
import router from './routes/booksRoute.js';
import cors from 'cors';
// var cors = require('cors');
// var express = require('express') commented bcz module import is done  in  package.json type:module

//Server creation
var app = express();
app.use(express.json());
app.use(cors());
app.use('/books', router);
//server run in port
app.listen(PORT, () => {
  console.log(`Server started in port `);
});

app.get('/', (req, res) => {
  res.send('hello how are  you iam from backend');
});

//How  to store BookData to DB

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((error) => {
    console.log(error);
  });
