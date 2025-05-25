import Book from '../models/Book.js';

export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, isbn, publishedDate, coverImage, pages } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      genre,
      isbn,
      publishedDate,
      coverImage,
      pages,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book', error: err.message });
  }
};

export const getAllBooks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const genre = req.query.genre || "";
  
      const skip = (page - 1) * limit;
  
      // Build filter dynamically
      const filter = {};
  
      if (search) {
        filter.title = { $regex: search, $options: "i" }; // case-insensitive
      }
  
      if (genre) {
        filter.genre = genre; // exact match
      }
  
      const totalBooks = await Book.countDocuments(filter);
  
      const books = await Book.find(filter)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
        books,
      });
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
  