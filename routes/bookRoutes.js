import express from 'express';
import { addBook } from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllBooks } from '../controllers/bookController.js';

const router = express.Router();

// POST /books - admin only
router.post('/', authMiddleware, adminMiddleware, addBook);
router.get('/all', getAllBooks);
// router.get('/search', getBookByTitle);

export default router;
