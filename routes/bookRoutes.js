import { Router } from 'express';
import Book from '../models/Book.js'
import { addBook, getBooks, getBookById } from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/books', authMiddleware, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if(!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const regex = new RegExp(q, 'i');
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }]
    });

    res.json({ total: books.length, books });
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
