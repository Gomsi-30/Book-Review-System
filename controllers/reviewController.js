import Review from '../models/Review.js';

export async function addReview(req, res) {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user.userId;

    console.log(rating);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }

    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateReview(req, res) {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    if (review.user.toString() !== userId) return res.status(403).json({ error: 'Not authorized' });

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }
      review.rating = rating;
    }
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteReview(req, res) {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    if (review.user.toString() !== userId) return res.status(403).json({ error: 'Not authorized' });

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
