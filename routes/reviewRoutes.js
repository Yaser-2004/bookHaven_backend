import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/:bookId', getReviews);

export default router;
