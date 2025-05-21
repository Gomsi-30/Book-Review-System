import { Router } from 'express';
import { addReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/books/:id/reviews', authMiddleware, addReview);
router.put('/reviews/:id', authMiddleware, updateReview);
router.delete('/reviews/:id', authMiddleware, deleteReview);

export default router;
