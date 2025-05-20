import Review from '../models/Review.js';
import Book from '../models/Book.js';

export async function addBook(req, res) {
  try {
    const { title, author, genre, description } = req.body;
    if(!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    const book = new Book({ title, author, genre, description });
    await book.save();
    res.status(201).json(book);
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getBooks(req, res) {
  try {
    let { page = 1, limit = 10, author, genre } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if(author) filter.author = new RegExp(author, 'i');
    if(genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page -1) * limit)
      .limit(limit);

    const total = await Book.countDocuments(filter);

    res.json({ total, page, limit, books });
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getBookById(req, res) {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if(!book) return res.status(404).json({ error: 'Book not found' });

    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'username')
      .skip((page -1) * limit)
      .limit(limit);

    const reviewCount = await Review.countDocuments({ book: bookId });

    const avgRatingObj = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" } } }
    ]);
    const avgRating = avgRatingObj.length ? avgRatingObj[0].avgRating.toFixed(2) : "No ratings yet";

    res.json({ book, avgRating, reviews, reviewCount, page, limit });
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
}
