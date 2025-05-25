import Review from '../models/Review.js';
import Book from '../models/Book.js';

export const addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const userId = req.user.id;

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({ user: userId, book: bookId });
    if (alreadyReviewed) return res.status(400).json({ message: 'Already reviewed' });

    const review = await Review.create({ user: userId, book: bookId, rating, comment });

    // Update book rating stats
    const reviews = await Review.find({ book: bookId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: avgRating.toFixed(1),
      totalReviews: reviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error posting review' });
  }
};


export const getReviews = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      
      const reviews = await Review.find({ book: bookId })
        .populate('user', 'name') // populate user name
        .sort({ createdAt: -1 });
        
        console.log(reviews);
        
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  };
  