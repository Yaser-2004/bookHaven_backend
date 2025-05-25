import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  genre: String,
  publishedDate: Date,
  coverImage: String,
  isbn: String,
  pages: Number,
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
