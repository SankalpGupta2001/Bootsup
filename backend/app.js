import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import  Book from "../models/Book";
import verify from "./verifyTokens";
const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/booksi', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  app.post('/api/books',verify, async (req, res) => {
    try {
      const book = new Book({
        title: req.body.title,
        author: req.body.author
      });
      const savedBook = await book.save();
      res.json(savedBook);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.delete('/api/books/:id',verify, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      await book.remove();
      res.send('Book deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


  app.get('/api/books/search', async (req, res) => {
    try {
      const { query } = req.query;
      const books = await Book.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } }
        ]
      });
      res.json(books);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  

  
  
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
