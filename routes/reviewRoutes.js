// Placeholder for reviewRoutes.js
import { Router } from 'express';
const router = Router();
import { addReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/books/:id/reviews', authMiddleware, addReview);
router.put('/reviews/:id', authMiddleware, updateReview);
router.delete('/reviews/:id', authMiddleware, deleteReview);

export default router;
