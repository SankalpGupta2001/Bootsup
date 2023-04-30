import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model('Book', bookSchema);