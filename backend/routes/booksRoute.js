import express from 'express';
import { Book } from '../Models/BookModel.js';

var router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send('Need title and author and publishyear');
    }
    var newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    var book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send('Some error while storing book in  DB');
  }
});

//Routs for get all books  from  DB

router.get('/', async (req, res) => {
  try {
    var books = await Book.find({});
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
  }
});

//Single books

router.get('/:id', async (req, res) => {
  try {
    var { id } = req.params;
    var book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
  }
});

//Delete

router.delete('/:id', async (req, res) => {
  try {
    var { id } = req.params;
    var result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: 'Book Not Found' });
    }
    return res.status(200).send({ message: 'Book Deleted successfully' });
  } catch (error) {
    console.log(error);
  }
});

//Put

router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send('Need titlt and author and publishyear');
    }
    var { id } = req.params;
    var result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: 'Book Not Found' });
    }
    return res.status(200).send({ message: 'Book Updated successfully' });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
